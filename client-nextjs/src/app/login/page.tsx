import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { useAuthSession } from "../../utils/auth";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

const LoginPage = async () => {
  const session = await useAuthSession();

  if (session) {
    return redirect(`notes/${dayjs().format("YYYY-MM-DD")}`);
  }

  return (
    <div className="text-center">
      <h3 className="text-xl py-6">Welcome in Solid Notes!</h3>
      <div className="flex justify-center">
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default LoginPage;
