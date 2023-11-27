import { Route, useNavigate } from "@solidjs/router";
import { Component, Show, createEffect, createResource } from "solid-js";
import { User } from "../types";
import Navbar from "./Navbar";

type AuthStatusResponse = {
  user: User | null;
};

type ProtectedRouteProps = {
  component: Component;
  path: string;
};

const fetchAuthStatus = async (): Promise<AuthStatusResponse> =>
  (
    await fetch("http://localhost:8000/auth/status", {
      credentials: "include",
    })
  ).json();

export const ProtectedRoute: Component<ProtectedRouteProps> = ({
  path,
  component,
}) => {
  const navigate = useNavigate();
  const [data] = createResource(fetchAuthStatus);

  createEffect(() => {
    if (!data.loading && !data().user) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <Show when={!data.loading} fallback={<div>Loading...</div>}>
      <Route path={path} component={component} />
    </Show>
  );
};

export default ProtectedRoute;
