import { Route, useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import { user } from "../stores/user";

type ProtectedRouteProps = {
  component: Component;
  path: string;
};

export const ProtectedRoute: Component<ProtectedRouteProps> = ({
  path,
  component,
}) => {
  const navigate = useNavigate();

  createEffect(() => {
    if (!user()) {
      navigate("/login", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  });

  return <Route path={path} component={component} />;
};

export default ProtectedRoute;
