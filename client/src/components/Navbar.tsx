import { useNavigate } from "@solidjs/router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: Event) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:8000/auth/logout");

      if (response.ok) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-white font-bold text-xl">Your Logo</div>

        <form onSubmit={handleLogout}>
          <button class="text-white" type="submit">
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
