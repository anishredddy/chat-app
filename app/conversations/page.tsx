import EmptyState from "@/components/EmptyState";
import React from "react";

const ConversationPage = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full md:block md:pl-80">
      <EmptyState />
    </div>
  );
};

export default ConversationPage;
