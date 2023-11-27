import { type Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
      </Routes>
    </Router>
  );
};

export default App;
