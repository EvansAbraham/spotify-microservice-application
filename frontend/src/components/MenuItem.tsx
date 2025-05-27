import type { ComponentType, MouseEventHandler } from "react";
import { useNavigate } from 'react-router-dom'

interface MenuItemProps {
    icon: ComponentType<{ className?: string }>;
    label: string;
    to?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
  }

const MenuItem = ({ icon: Icon, label, to, onClick }: MenuItemProps) => {

  const navigate = useNavigate();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (onClick) {
      onClick(event);
    }
    if (to) {
      navigate(to);
    }
  };

  return (
    <div
      className="flex items-center gap-3 pl-8 cursor-pointer"
      onClick={handleClick}
    >
      <Icon className="text-2xl" />
      <p className="font-medium">{label}</p>
    </div>
  )
}

export default MenuItem