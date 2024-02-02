import Image from "next/image";

const GoogleSignInForm = () => {
  return (
    <form
      action={`${process.env.NEXT_PUBLIC_HOST}/auth/google`}
      method="get"
      className="flex justify-center m-4"
    >
      <button
        type="submit"
        className="flex items-center border-2 p-2 bg-blue-200 rounded"
      >
        <Image
          width={30}
          height={30}
          src="/icons/google.svg"
          alt="google icon"
        />
        <span>Sign in</span>
      </button>
    </form>
  );
};

export default GoogleSignInForm;
