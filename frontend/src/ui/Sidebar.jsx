import Logo from "./Logo";
import MainNav from "./MainNav";

const Sidebar = () => {
  return (
    <aside className="w-64 space-y-16 h-screen border-r">
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
