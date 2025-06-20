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
import BookDetail from "./pages/Detail";
import ViewOrder from "./pages/ViewOrder";
import ViewOrdersDetail from "./pages/ViewOrdersDetail";

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<ListPage />} />
        <Route path="/book/view/:bookId" element={<BookDetail />} />
        <Route path="/book/orders" element={<ViewOrder />} />
        <Route path="/books/orders/:bookId" element={<ViewOrdersDetail />} />
      </Routes>
    </div>
  );
}

export default App;
