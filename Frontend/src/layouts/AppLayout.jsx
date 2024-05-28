import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function AppLayout() {
  return (
    <section className="relative h-[100vh] max-w-5xl mx-auto">
      <Nav />
      <Outlet />
    </section>
  );
}
