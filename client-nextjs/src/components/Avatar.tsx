import { Session } from "next-auth";
import Image from "next/image";
import { FC } from "react";

type AvatarProps = {
  session: Session;
};

const AVATAR_SIZE = 30;

const Avatar: FC<AvatarProps> = ({ session }) => {
  if (session.user?.image) {
    return (
      <Image
        src={session.user?.image}
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        alt="avatar"
        className="rounded-full"
      />
    );
  }
  return (
    <div
      className={`w-[${AVATAR_SIZE}px] h-[${AVATAR_SIZE}px] flex justify-center items-center rounded-full bg-orange-500 text-white uppercase`}
    >
      {session.user?.name?.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;
