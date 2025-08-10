import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { type RootState } from "../app/store";
import Footer from "./Footer";
import Header from "./Header";
import ColdStartSpinner from "./ui/ColdStartSpinner";

const Layout = () => {
  const { isApiReady } = useSelector((state: RootState) => state.app);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex flex-grow flex-col px-4 py-8">
        {isApiReady ? <Outlet /> : <ColdStartSpinner />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
