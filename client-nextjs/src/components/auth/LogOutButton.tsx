"use client";

import { signOut } from "next-auth/react";
import LogoutIcon from "../icons/LogoutIcon";

const LogOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="text-gray-600 flex gap-2 items-center bg-gray-300 py-1 px-2 rounded hover:bg-gray-200"
    >
      <LogoutIcon />
      <span>Log out</span>
    </button>
  );
};

export default LogOutButton;
