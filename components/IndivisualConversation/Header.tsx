"use client";

import useOtherUser from "@/hooks/use-other-user";
import { CompleteConversationType } from "@/types/type";
import Avatar from "../Avatar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useState } from "react";
import ProfileSettings from "./ProfileSettings";
import { useProfile } from "@/hooks/use-profile";

interface HeaderProps {
  conversation: CompleteConversationType;
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const onOpen = useProfile((state) => state.onOpen);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <div className="flex lg:m-5 md:m-5 pb-2 items-center border-b-[1px]">
        <IoMdArrowRoundBack
          className="h-8 w-8 md:hidden lg:hidden block mr-5 ml-5"
          onClick={handleBack}
        />
        <div className="py-2">
          <Avatar currentUser={otherUser} />
        </div>
        <p className="pl-5 font-bold text-xl">{otherUser.name}</p>
        <HiEllipsisHorizontal
          size={40}
          className="ml-auto
          cursor-pointer
          transition
        "
          onClick={onOpen}
        />
      </div>
    </>
  );
};

export default Header;
