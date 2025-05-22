import React from "react";
import PreferenceToggle from "../components/PreferenceToggle";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-5 dark:bg-[#0a0a0a] bg-[#f1f1f1]">
      <div className="max-w-[900px] my-auto text-black dark:text-white">
        <h1 className="text-[32px] font-bold flex items-center">Balanceè</h1>
        <p className="text-[#6b7280] mt-2 flex items-center">
          Smart Car Repair Booking
        </p>
      </div>
      <PreferenceToggle />
    </div>
  );
};

export default Navbar;
