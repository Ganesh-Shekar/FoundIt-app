import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import PostLostItem from "./pages/PostLostItem";
import PostFoundItem from "./pages/PostFoundItem";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* Add padding-top to account for fixed navbar */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LostItems />} />
            <Route path="/lost" element={<LostItems />} />
            <Route path="/found" element={<FoundItems />} />
            <Route path="/post-lost" element={<PostLostItem />} />
            <Route path="/post-found" element={<PostFoundItem />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
