"use client";

import useOtherUser from "@/hooks/use-other-user";
import { useProfile } from "@/hooks/use-profile";
import { CompleteConversationType } from "@/types/type";
import { IoMdClose } from "react-icons/io";
import BigAvatar from "./BigAvatar";

import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProfileSettingsProps {
  conversation: CompleteConversationType;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const router = useRouter();

  const profile = useProfile();

  const onClose = useProfile((state) => state.onClose);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/conversations/${conversation.id}`);

      toast.success("Delted conversation");

      router.push("/conversations");
    } catch {
      toast.error("something went wrong");
    }
  };

  if (!profile.isOpen) {
    return null;
  }
  return (
    <div className="relative h-full w-full bg-gray-200 z-50">
      <div className="flex flex-col h-full md:w-1/2 lg:w-1/4  bg-white ml-auto  border-[1px] border-black">
        <div className="flex ml-auto">
          <IoMdClose size={25} className="m-5 ml-auto" onClick={onClose} />
        </div>
        <div className="flex flex-col h-full items-center justify-center">
          <div className="h-1/3 w-2/3 -mt-40 rounded-full overflow-hidden ">
            <BigAvatar currentUser={otherUser} />
          </div>
          <div className="flex items-center justify-center">
            <p className="text-lg font-bold text-black mt-5">
              {otherUser.name}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-xs font-medium text-neutral-500 mt-1 ">
              {otherUser.email}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-xs font-bold text-black mt-3 ">
              Joined on {format(otherUser.createdAt, "dd/MM/yyyy")}
            </p>
          </div>
          <div
            className="flex items-center justify-center mt-10 bg-red-400 px-5 py-3 rounded-md"
            onClick={handleDelete}
          >
            <MdDelete size={30} />
            <p className="text-md font-bold text-neutral-800 ml-3">Unfriend?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
