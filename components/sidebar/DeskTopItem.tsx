import Link from "next/link";

interface DeskTopItemProps {
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const DeskTopItem: React.FC<DeskTopItemProps> = ({
  href,
  icon: Icon,
  onClick,
  active,
}) => {
  return (
    <li className="hover:opacity-80 transition">
      <Link href={href} onClick={onClick}>
        <Icon className="lg:h-8 lg:w-8 h-6 w-6" aria-hidden="true" />
      </Link>
    </li>
  );
};

export default DeskTopItem;
