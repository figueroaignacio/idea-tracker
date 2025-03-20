import { Outlet } from "react-router";
import { Header } from "~/components/header";

export default function LobbyLayout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
