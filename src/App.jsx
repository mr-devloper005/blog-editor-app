// App.jsx
import { Route, RouterProvider, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Register from "./components/Register";
import BlogEditor from "./components/BlogEditor";
function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/editor" element={<BlogEditor />}></Route>
      </Routes>
    </div>
  );
}

export default App;
