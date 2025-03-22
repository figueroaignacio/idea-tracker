import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="container">
      <Link
        to="/"
        className="border-[1px] border-white/15 px-4 py-2 rounded-xl cursor-pointer"
      >
        👈🏽 Back
      </Link>
      <Outlet />
    </div>
  );
}
