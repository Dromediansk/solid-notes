import { type Component } from "solid-js";

const LoginPage: Component = () => {
  return (
    <div class="flex justify-center py-5">
      <form
        action={`${import.meta.env.VITE_SERVER_HOST}/auth/google`}
        method="get"
      >
        <button
          type="submit"
          class="flex items-center border-2 p-2 bg-blue-200 rounded"
        >
          <img src="/icons/google.svg" />
          <span>Sign in</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
