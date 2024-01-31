import {
  createResource,
  type Component,
  createEffect,
  Show,
  lazy,
} from "solid-js";
import { Route, Router, Routes } from "@solidjs/router";

import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { fetchAuthStatus } from "./services/auth";
import { setUser } from "./stores/user";
import RegisterPage from "./pages/RegisterPage";
import RouteGuard from "./components/RouteGuard";

const HomePage = lazy(() => import("./pages/HomePage"));

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
            <Route path="/register" component={RegisterPage} />
            <Route path="/" component={RouteGuard}>
              <Route path="/home" component={HomePage} />
            </Route>
            <Route path="*" component={() => <div>Page Not found!!!</div>} />
          </Routes>
        </Show>
      </main>
    </Router>
  );
};

export default App;
