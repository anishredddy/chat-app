import getConversationById from "@/actions/get-conversation-by-id";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/IndivisualConversation/Header";
import Input from "@/components/IndivisualConversation/Input";
import ConversationBody from "@/components/IndivisualConversation/ConversationBody";
import React from "react";
import ProfileSettings from "@/components/IndivisualConversation/ProfileSettings";

const IndivisualConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversation = await getConversationById(params.conversationId);

  if (!conversation) {
    return (
      <div className="hidden lg:block lg:pl-80 h-full md:block md:pl-80">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full  md:pl-80 w-full">
      <div className="lg:hidden md:hidden pt-20" />
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <ProfileSettings conversation={conversation} />
        <ConversationBody initialMessages={conversation.messages} />
        <Input />
      </div>
    </div>
  );
};

export default IndivisualConversationPage;
