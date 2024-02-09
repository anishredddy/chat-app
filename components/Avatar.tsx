import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  currentUser: User;
}

const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
  return (
    <div className="relative">
      <div className="relative rounded-full w-9 h-9 lg:w-12 lg:h-12 overflow-hidden hover:opacity-80 transition">
        <Image
          src={currentUser?.image || "/images/default_dp.jpg"}
          alt="profile pic"
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
