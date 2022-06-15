import "./styles.css";
import Navbar from "./components/Navbar/Navbar.component";
import Home from "./components/Home/Home.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
