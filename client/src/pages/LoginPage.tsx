import { type Component } from "solid-js";

const LoginPage: Component = () => {
  return (
    <div>
      <form
        action={`${import.meta.env.VITE_SERVER_HOST}/auth/google`}
        method="get"
      >
        <button type="submit">Google login</button>
      </form>
    </div>
  );
};

export default LoginPage;
