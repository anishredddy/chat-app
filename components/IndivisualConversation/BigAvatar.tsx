import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  currentUser: User;
}

const BigAvatar: React.FC<AvatarProps> = ({ currentUser }) => {
  return (
    <div>
      <div className="flex items-center justify-center rounded-full overflow-hidden hover:opacity-80 transition">
        <Image
          src={currentUser?.image || "/images/default_dp.jpg"}
          alt="profile pic"
          height={220}
          width={220}
        />
      </div>
    </div>
  );
};

export default BigAvatar;
