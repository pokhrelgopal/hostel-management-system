import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <main className="flex">
      <Sidebar />
      <section className="flex-1">
        <Header />
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
