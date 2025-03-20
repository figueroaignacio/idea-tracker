import { Link } from "react-router";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="border-b-[1px] border-white/15">
      <div className="container flex justify-between items-center">
        <Logo />
        <Link
          to="/auth/login"
          className="border-[1px] border-white/15 px-4 py-2 rounded-xl"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
