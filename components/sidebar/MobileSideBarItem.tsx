import Link from "next/link";

interface SideBarItemProps {
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const MobileSideBarItem: React.FC<SideBarItemProps> = ({
  href,
  icon: Icon,
  onClick,
  active,
}) => {
  return (
    <div className="hover:opacity-80 transition w-1/3 flex items-center justify-center border-[1px]">
      <Link href={href}>
        <Icon className="h-8 w-8 my-2" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default MobileSideBarItem;
