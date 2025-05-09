import { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const favRef = doc(db, "favourites", user.uid);
        const snapshot = await getDoc(favRef);
        if (snapshot.exists()) {
          setFavourites(snapshot.data().movies || []);
        } else {
          setFavourites([]);
          await setDoc(favRef, { movies: [] });
        }
      } else {
        setFavourites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addToFavourites = async (movie) => {
    if (!user) return;

    const favRef = doc(db, "favourites", user.uid);
    setFavourites((prev) => [...prev, movie]);

    await updateDoc(favRef, {
      movies: arrayUnion(movie),
    });
  };

  const removeFromFavourites = async (movieId) => {
    if (!user) return;

    const movieToRemove = favourites.find((m) => m.id === movieId);
    if (!movieToRemove) return;

    const favRef = doc(db, "favourites", user.uid);
    setFavourites((prev) => prev.filter((m) => m.id !== movieId));

    await updateDoc(favRef, {
      movies: arrayRemove(movieToRemove),
    });
  };

  const isFavourite = (movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};