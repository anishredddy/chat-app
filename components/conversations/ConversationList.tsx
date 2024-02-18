"use client";

import { CompleteConversationType } from "@/types/type";
import ConversationItem from "./ConversationItem";
import useConversation from "@/hooks/use-conversation";
import { User } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationListProps {
  coversations: CompleteConversationType[];
  currentUser?: User | null;
}

const ConversationList: React.FC<ConversationListProps> = ({
  coversations,
  currentUser,
}) => {
  const session = useSession();
  const { conversationId, isOpen } = useConversation();

  const [items, setItems] = useState(coversations);

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: CompleteConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: CompleteConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
    };
  }, [pusherKey]);
  return (
    <div
      className="fixed sm:pb-20 pb-0 md:left-20 lg:left-30 
      md:w-80 lg:w-80 sm:overflow-y-auto border-r border-l
      border-gray-200 block sm:w-full w-full sm:left-0 h-full "
    >
      <div className="">
        <div className="flex flex-col">
          <div className="text-3xl lg:ml-5 md:ml-3 font-bold text-neutral-800 lg:pt-7 pt-5">
            Messages
          </div>
          <div className="mt-3 border-t">
            {items.map((conversation) => (
              <ConversationItem
                conversation={conversation}
                key={conversation.id}
                selected={conversation.id === conversationId}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
