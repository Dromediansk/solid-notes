import { user } from "../store";

const Navbar = () => {
  return (
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white font-bold text-xl">Your Logo</div>

        {user() && (
          <form
            action={`${import.meta.env.VITE_SERVER_HOST}/auth/logout`}
            method="get"
          >
            <button class="text-white" type="submit">
              Logout
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
