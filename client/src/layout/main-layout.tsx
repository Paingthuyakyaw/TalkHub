import { Outlet } from "@tanstack/react-router";
import Logo from "../assets/logo-white.svg";
import SliderLayout from "./slider-layout";

const MainLayout = () => {
  return (
    <div className=" h-screen overflow-hidden flex">
      <div className="   w-72  ">
        {/* Logo */}
        <div className=" px-2  pl-4  border-gray-300 h-14 flex items-center justify-start gap-1">
          <img src={Logo} alt="Logo" className=" w-11 h-8 object-cover " />
          <p className=" font-semibold ">Talk Hub</p>
        </div>
        <div className=" bg-gray-100 h-screen">
          <SliderLayout />
        </div>
      </div>
      <div className="  w-full ">
        <div className=" px-2 h-14 "></div>

        <div className="  h-screen pt-5 pr-2  bg-gray-100 ">
          <div className=" border border-white h-[90vh] rounded-md   bg-white ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
