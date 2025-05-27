import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    to?: string;
  }

const Button = ({ children, className, to, onClick, ...props }: ButtonProps) => {

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (to && !event.defaultPrevented) {
      navigate(to);
    }
  };

  return (
    <button
    className={clsx(
      "px-4 py-1 bg-white text-black text-sm rounded-full hover:bg-gray-200 cursor-pointer",
      className
    )}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
  )
}

export default Button