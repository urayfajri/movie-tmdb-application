import { Routes, Route, Outlet } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="container py-6">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
