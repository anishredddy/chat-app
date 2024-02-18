"use client";

import { CompleteConversationType } from "@/types/type";
import ConversationItem from "./ConversationItem";
import useConversation from "@/hooks/use-conversation";
import { User } from "@prisma/client";

interface ConversationListProps {
  coversations: CompleteConversationType[];
  currentUser?: User | null;
}

const ConversationList: React.FC<ConversationListProps> = ({
  coversations,
  currentUser,
}) => {
  const { conversationId, isOpen } = useConversation();
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
            {coversations.map((conversation) => (
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
