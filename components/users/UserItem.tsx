"use client";

import { User } from "@prisma/client";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const router = useRouter();

  const handleClick = async () => {
    const data = await axios.post("/api/conversations", { userId: user.id });

    router.push(`/conversations/${data.data.id}`);
  };
  return (
    <div
      className="border-gray-200 flex flex-row border-b border-t cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className=" flex flex-row py-2">
        <div className="py-3">
          <Avatar currentUser={user} />
        </div>
        <div className="flex flex-col">
          <div className="text-md font-bold py-0 pt-2 px-3">{user.name}</div>
          <div className="text sm text-neutral-500 pl-3">
            Click to start a conversation
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
