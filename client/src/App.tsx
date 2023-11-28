import { createResource, type Component, createEffect } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { User } from "./types";
import { setUser } from "./store";

type AuthStatusResponse = {
  user: User | null;
};

const fetchAuthStatus = async (): Promise<AuthStatusResponse> => {
  try {
    const response = await fetch("http://localhost:8000/auth/status", {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching auth status: ", error);
  }
};

const App: Component = () => {
  const [data] = createResource(fetchAuthStatus);

  createEffect(() => {
    if (!data.loading && data().user) {
      console.log(data().user);
      setUser(data().user);
    }
  });

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
