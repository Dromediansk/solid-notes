import { Outlet, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { user } from "../stores/user";

const RouteGuard = () => {
  const navigate = useNavigate();

  createEffect(() => {
    if (!user()) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RouteGuard;
