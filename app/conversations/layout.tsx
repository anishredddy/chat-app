import getUsers from "@/actions/get-users";
import UserList from "@/components/users/UserList";
import SideBar from "@/components/sidebar/SideBar";
import getConversations from "@/actions/get-conversations";
import ConversationList from "@/components/conversations/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversation = await getConversations();

  return (
    <SideBar>
      <ConversationList coversations={conversation} />
      {children}
    </SideBar>
  );
}
