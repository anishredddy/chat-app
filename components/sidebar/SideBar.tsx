import getCurrentUser from "@/actions/get-current-user";
import DesktopSideBar from "./DesktopSideBar";
import MobileSideBar from "./MobileSideBar";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSideBar currentUser={currentUser!} />
      <MobileSideBar />
      <main className=" lg:pl-30 md:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
