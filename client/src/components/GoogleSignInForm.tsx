const GoogleSignInForm = () => {
  return (
    <form
      action={`${import.meta.env.VITE_SERVER_HOST}/auth/google`}
      method="get"
      class="flex justify-center m-4"
    >
      <button
        type="submit"
        class="flex items-center border-2 p-2 bg-blue-200 rounded"
      >
        <img src="/icons/google.svg" />
        <span>Sign in</span>
      </button>
    </form>
  );
};

export default GoogleSignInForm;
