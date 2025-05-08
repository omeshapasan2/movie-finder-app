# 🎬 Movie App

A simple React-based movie search and favorites app using the [TMDb API](https://www.themoviedb.org/documentation/api). Users can browse popular movies, search by title, and add/remove favorites.

---

## Visit Live Site
[Click Here](https://movies.omeshapasan.site)

## 🚀 Features

- 🔍 **Search Movies** by title via TMDb API
- 📈 **Popular Movies** auto-loaded on homepage
- ❤️ **Favorites Management** (add/remove)
- 🤖 **Responsive UI** with modern styling
- 🧭 **Routing** with React Router (`Home`, `Favourites`)
- 🎨 **Custom UI Controls** (with icon buttons)

---

## 🛠️ Tech Stack

- **React**
- **React Router**
- **CSS (custom styling)**
- **TMDb API** for movie data
- **Local Storage** for persisting favorites

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/movie-app.git
cd movie-app
```

2. Install dependencies
```bash
npm install
```

3. Add your TMDb API key
In /services/api.js, replace the existing API key with your own:

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

Get your key here: https://www.themoviedb.org/settings/api

4. Run the app
```bash
npm start
```

📁 Project Structure
```bash
src/
│
├── components/
│   ├── MovieCard.js       # Renders movie tiles
│   └── NavBar.js          # Top navigation
│
├── contexts/
│   └── MovieContext.js    # Global state for favourites
│
├── pages/
│   ├── Home.js            # Search and popular movies
│   └── Favourites.js      # List of favourite movies
│
├── services/
│   └── api.js             # TMDb API calls
│
├── css/
│   └── *.css              # Custom styles
│
├── App.js
└── index.js
```

🚀 Upcoming Features
- 🔄 Cloud Sync – Keep your favourites synced on all logged-in devices
- 🌓 Theme Toggle – Switch between dark and light mode
- 📺 TV Series Support – Browse and favourite your favourite shows

📸 Screenshots

Home Page	
![image](https://github.com/user-attachments/assets/b1e07752-a467-49f6-8d10-8810cc827d5c)
