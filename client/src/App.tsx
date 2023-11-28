import { createResource, type Component, createEffect, Show } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { fetchAuthStatus } from "./services/auth";
import { setUser } from "./stores/user";

const App: Component = () => {
  const [data] = createResource(fetchAuthStatus);

  createEffect(() => {
    if (!data.loading && data().user) {
      setUser(data().user);
    }
  });

  return (
    <Router>
      <Navbar />
      <main class="p-4">
        <Show
          when={!data.loading}
          fallback={
            <div class="flex justify-center items-center">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-solid"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/login" component={LoginPage} />
            <ProtectedRoute path="/" component={HomePage} />
          </Routes>
        </Show>
      </main>
    </Router>
  );
};

export default App;
