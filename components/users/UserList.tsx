import { User } from "@prisma/client";
import UserItem from "./UserItem";

interface UserListProps {
  users: User[];
}
const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div
      className="fixed sm:pb-20 pb-0 md:left-20 lg:left-30 
      md:w-80 lg:w-80 sm:overflow-y-auto border-r border-l
      border-gray-200 block sm:w-full w-full sm:left-0 h-full "
    >
      <div className="px-5">
        <div className="flex flex-col">
          <div className="text-3xl font-bold text-neutral-800 lg:pt-7 sm:pt-4">
            People
          </div>
          <div className="mt-3 border-t">
            {users.map((user) => (
              <UserItem user={user} key={user.email} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
