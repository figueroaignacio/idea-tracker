import { Link } from "react-router";
import { Logo } from "./logo";
import { buttonVarians } from "./ui/button";

export function Header() {
  return (
    <header className="border-b-[1px] border-border">
      <div className="container flex justify-between items-center">
        <Logo />
        <Link
          to="/auth/login"
          className={buttonVarians({ variant: "secondary" })}
        >
          Login
        </Link>
      </div>
    </header>
  );
}
