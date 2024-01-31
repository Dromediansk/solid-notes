import { type Component } from "solid-js";
import GoogleSignInForm from "../components/GoogleSignInForm";
import EmailSignInForm from "../components/EmailSignInForm";

const LoginPage: Component = () => {
  return (
    <div class="py-5 flex flex-col items-center">
      <EmailSignInForm />
      <div class="p-4">
        <span>Or use your social account:</span>
        <GoogleSignInForm />
      </div>
    </div>
  );
};

export default LoginPage;
