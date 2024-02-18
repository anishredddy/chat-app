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
import getCurrentUser from "@/actions/get-current-user";

interface ConversationItemProps {
  conversation: CompleteConversationType;
  selected: boolean;
  currentUser?: User | null;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  selected,
  currentUser,
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

  const seenLastMessage = useMemo(() => {
    if (currentUser && conversation.messages.length >= 1) {
      if (conversation.messages[0].seenIds.length == 2) {
        return false;
      } else if (conversation.messages[0].seenIds[0] === currentUser.id) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }, [conversation.messages, currentUser]);

  const date = useMemo(() => {
    if (conversation.messages.length >= 1) {
      return format(new Date(conversation.messages[0].createdAt), "p");
    }
    return null;
  }, [conversation.messages]);

  const handleClick = async () => {
    // const data = await axios.post("/api/conversations", { userId: user.id });
    await axios.post(`/api/conversations/${conversation.id}/seen`);
    // console.log(data);
    // router.push(`/conversations/${data.data.id}`);
    router.push(`/conversations/${conversation.id}`);
  };
  return (
    <div
      className={clsx(
        `border-gray-200 flex flex-row border-b border-t cursor-pointer hover:bg-gray-100 w-full`,
        selected ? "bg-neutral-100" : "bg-white",
        selected && "md:flex lg:flex hidden"
      )}
      onClick={handleClick}
    >
      <div className="lg:ml-5 md:ml-3 flex flex-row py-2 w-full">
        <div className="py-3 ">
          <Avatar currentUser={otherUser} />
        </div>
        <div className="flex flex-col">
          <div className="text-md font-bold py-0 pt-2 px-3">
            {otherUser.name}
          </div>
          <div
            className={clsx(
              "text sm pl-3 flex flex-row items-center w-40 truncate",
              seenLastMessage ? "font-medium text-black" : "text-neutral-500"
            )}
          >
            {lastMessage}
            {seenLastMessage && (
              <div className="fixed ml-9 pl-40">
                <div className="rounded-full bg-neutral-700 w-4 h-4" />
              </div>
            )}
          </div>
          {date && (
            <div className="text-xs text-neutral-400 font-light ml-3 pl-40">
              {date}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
