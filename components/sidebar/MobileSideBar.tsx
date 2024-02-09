"use client";

import useRoutes from "@/hooks/use-routes";
import MobileSideBarItem from "./MobileSideBarItem";

const MobileSideBar = () => {
  const routes = useRoutes();
  return (
    <div className="fixed w-full bottom-0 flex items-center justify-center bg-white border-t-[1px] lg:hidden md:hidden">
      <>
        {routes.map((item) => (
          <MobileSideBarItem
            icon={item.icon}
            key={item.href}
            href={item.href}
            onClick={item.onClick}
            active={item.active}
          />
        ))}
      </>
    </div>
  );
};

export default MobileSideBar;
