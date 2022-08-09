import { Container } from "@mui/system";
import "./App.css";
import Header from "./components/header/header";
import SimpleBottomNavigation from "./components/navigation/navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Search from "./pages/search/Search";
import Home from "./pages/home/Home";

// Renders the Home and Search pages

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            {/* Default path = '/', will navigate to '/HOME' page which renders <Home /> component (default) */}
            <Route path="/" element={<Navigate to="/HOME" replace />} />
            <Route path="/HOME" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
