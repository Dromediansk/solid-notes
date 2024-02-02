import GoogleSignInForm from "@/components/GoogleSignInForm";

const LoginPage = () => {
  return (
    <div>
      <h3 className="text-xl text-center py-6">Welcome in Solid Notes!</h3>
      <GoogleSignInForm />
    </div>
  );
};

export default LoginPage;
