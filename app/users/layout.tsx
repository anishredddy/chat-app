import getUsers from "@/actions/get-users";
import UserList from "@/components/users/UserList";
import SideBar from "@/components/sidebar/SideBar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <SideBar>
      <UserList users={users} />
      {children}
    </SideBar>
  );
}
