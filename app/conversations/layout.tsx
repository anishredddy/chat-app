import getUsers from "@/actions/get-users";
import UserList from "@/components/users/UserList";
import SideBar from "@/components/sidebar/SideBar";
import getConversations from "@/actions/get-conversations";
import ConversationList from "@/components/conversations/ConversationList";
import getCurrentUser from "@/actions/get-current-user";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversation = await getConversations();
  const currentUser = await getCurrentUser();

  return (
    <SideBar>
      <ConversationList coversations={conversation} currentUser={currentUser} />
      {children}
    </SideBar>
  );
}
