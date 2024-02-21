"use client";

import useRoutes from "@/hooks/use-routes";
import { User } from "@prisma/client";
import DeskTopItem from "./DeskTopItem";
import Avatar from "../Avatar";
import { url } from "inspector";
import { useState } from "react";
import SettingsModal from "../SettingsModal";

interface DesktopSideBarProps {
  currentUser: User;
}

const DesktopSideBar: React.FC<DesktopSideBarProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const routes = useRoutes();
  return (
    <>
      <div className="hidden md:fixed md:px-6  md:pb-2 md:flex md:flex-col md:h-full lg:fixed lg:px-6  lg:pb-2 lg:flex lg:flex-col lg:h-full">
        <nav className="flex flex-col items-center lg:mt-8 mt-6  flex-grow">
          <ul className="flex flex-col items-center space-y-10">
            {routes.map((item) => (
              <DeskTopItem
                href={item.href}
                active={item.active}
                key={item.href}
                onClick={item.onClick}
                icon={item.icon}
              />
            ))}
          </ul>
        </nav>
        <nav
          className="mb-7 flex flex-col justify-end items-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Avatar currentUser={currentUser} />
        </nav>
      </div>
      {isOpen && (
        <div className="fixed h-full w-full bg-white z-50">
          <SettingsModal
            currentUser={currentUser}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default DesktopSideBar;
