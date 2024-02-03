import { useAuthSession } from "@/utils/auth";
import SignOutButton from "./auth/SignOutButton";

const Navbar = async () => {
  const session = await useAuthSession();

  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <span className="font-bold text-lg text-white">Solid Notes</span>
            <ul className="hidden md:flex gap-x-6 text-white ">
              {session && <SignOutButton />}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
