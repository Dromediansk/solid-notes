import { type Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

const App: Component = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute path="/" component={HomePage} />
      </Routes>
    </Router>
  );
};

export default App;
