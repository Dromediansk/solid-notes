import { JSX, createSignal } from "solid-js";

const EmailSignInForm = () => {
  const [formState, setFormState] = createSignal({ email: "", password: "" });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log(formState());
  };

  const handleInputChange: JSX.ChangeEventHandlerUnion<
    HTMLInputElement,
    InputEvent
  > = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };

  return (
    <>
      <h1 class="text-2xl text-center">Login</h1>
      <form class="w-72 p-2 mx-auto bg-blue-50 rounded" onSubmit={handleSubmit}>
        <div class="flex gap-2 p-2 items-center">
          <label class="w-28" for="email">
            Email:
          </label>
          <input
            class="p-2 w-full"
            id="email"
            type="email"
            placeholder="E-mail"
            value={formState().email}
            onChange={handleInputChange}
            name="email"
            required
          />
        </div>

        <div class="flex gap-2 p-2 items-center">
          <label class="w-28" for="password">
            Password:
          </label>
          <input
            class="p-2 w-full"
            id="password"
            type="password"
            placeholder="Password"
            value={formState().password}
            onChange={handleInputChange}
            name="password"
            required
          />
        </div>

        <div class="m-auto p-2 text-center border border-blue-200 w-[100px]">
          <button type="submit">Log in</button>
        </div>

        <div>
          <span>Don't have an account?</span>&nbsp;
          <a href="/register" class="underline text-blue-500">
            Register here
          </a>
        </div>
      </form>
    </>
  );
};

export default EmailSignInForm;
