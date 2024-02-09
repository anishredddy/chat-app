"use client";

import useOtherUser from "@/hooks/use-other-user";
import { CompleteConversationType } from "@/types/type";
import Avatar from "../Avatar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

interface HeaderProps {
  conversation: CompleteConversationType;
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex lg:m-5 md:m-5 pb-2 items-center border-b-[1px]">
      <IoMdArrowRoundBack
        className="h-8 w-8 md:hidden lg:hidden block mr-5 ml-5"
        onClick={handleBack}
      />
      <div className="py-2">
        <Avatar currentUser={otherUser} />
      </div>
      <p className="pl-5 font-bold text-xl">{otherUser.name}</p>
    </div>
  );
};

export default Header;
