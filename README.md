# 🎬 TMDB Vite React

A movie browsing web app built with **React 18 + Vite + TypeScript**, styled using **Tailwind CSS**, and powered by the **TMDB API**.  
The app allows users to search, filter, and explore movies with detail pages and pagination.

---

## ✨ Features

1. **Display Movie List**  
   Browse a list of movies fetched from TMDB API.

2. **Movie Search**  
   Search movies by title using TMDB search API.

3. **Filtering by Category**

   - 🎥 Now Playing
   - ⭐ Popular
   - 🏆 Top Rated
   - 📅 Upcoming

4. **Movie Detail Page**  
   View detailed information about a movie including title, release year, overview, director, and cast.

5. **Pagination**  
   Navigate between pages of movies (handled with Zustand state management).

---

## 🛠️ Tech Stack

- **React 18** + **Vite** + **TypeScript** → core framework
- **Tailwind CSS** → utility-first styling
- **Zustand** → state management for category, query, and page
- **React Router** → navigation between pages
- **Jest + React Testing Library** → unit testing
- **GitHub Actions** → CI pipeline for tests & build

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tmdb-vite-react.git
cd tmdb-vite-react
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Fill in your TMDB API Key inside .env:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
Get your API key from TMDB API.
```

### 4. Run locally

```bash
npm run dev
```

App runs on: http://localhost:5173/

### 5. Run tests

```bash
npm run test
```

## 📌 Notes

```bash
- Pagination implemented as numbered pages and managed with Zustand state.
- Project structured with modular components and pages for scalability.
```
