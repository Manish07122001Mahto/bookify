import { Routes, Route } from "react-router-dom";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//components
import MyNavbar from "./components/Navbar";
//pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import ListPage from "./pages/List";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
