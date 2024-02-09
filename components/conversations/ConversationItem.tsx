"use client";

import { User } from "@prisma/client";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CompleteConversationType } from "@/types/type";
import useOtherUser from "@/hooks/use-other-user";
import { useMemo } from "react";
import { format } from "date-fns";
import clsx from "clsx";

interface ConversationItemProps {
  conversation: CompleteConversationType;
  selected: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  selected,
}) => {
  const router = useRouter();

  const otherUser = useOtherUser(conversation);

  //   const lastMessage =
  //     conversation.messages.length >= 1
  //       ? conversation.messages[0].body
  //       : "Click to start a conversation!!";

  // memoised last message for improved performace and caching

  const lastMessage = useMemo(() => {
    if (conversation.messages.length >= 1) {
      if (conversation.messages[0].body) {
        return conversation.messages[0].body;
      } else {
        return "Sent an Image";
      }
    } else {
      return "click to start a conversation";
    }
  }, [conversation.messages]);

  const date = useMemo(() => {
    if (conversation.messages.length >= 1) {
      return format(new Date(conversation.messages[0].createdAt), "p");
    }
    return null;
  }, [conversation.messages]);

  const handleClick = async () => {
    // const data = await axios.post("/api/conversations", { userId: user.id });
    // console.log(data);
    // router.push(`/conversations/${data.data.id}`);
    router.push(`/conversations/${conversation.id}`);
  };
  return (
    <div
      className={clsx(
        `border-gray-200 flex flex-row border-b border-t cursor-pointer hover:bg-gray-100`,
        selected ? "bg-neutral-100" : "bg-white",
        selected && "md:flex lg:flex hidden"
      )}
      onClick={handleClick}
    >
      <div className=" flex flex-row py-2 ">
        <div className="py-3 ">
          <Avatar currentUser={otherUser} />
        </div>
        <div className="flex flex-col">
          <div className="text-md font-bold py-0 pt-2 px-3">
            {otherUser.name}
          </div>
          <div className="text sm text-neutral-500 pl-3 ">{lastMessage}</div>
          {date && (
            <div className="text-xs text-neutral-400 font-light ml-auto">
              {date}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
