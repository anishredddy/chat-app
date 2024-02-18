"use client";

import useConversation from "@/hooks/use-conversation";
import { CompleteMessageType } from "@/types/type";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface ConversationBodyProps {
  initialMessages: CompleteMessageType[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages,
}) => {
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  //   const bottomRef= useRef<HTMLElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <p key={message.id}>hi</p>
      ))}
      {/* <div className="pt-24" ref={bottomRef} /> */}
    </div>
  );
};

export default ConversationBody;
