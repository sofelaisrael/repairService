import { RxCaretDown } from "react-icons/rx";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { MdOutlineLaptopWindows } from "react-icons/md";
import React, { useState, useEffect } from "react";

const PreferenceToggle = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    applyTheme();
  });

  const applyTheme = () => {
    const body = document.querySelector("body");
    const userTheme = localStorage.theme;
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = userTheme === "dark" || (!userTheme && systemTheme);
    console.log(userTheme, systemTheme, isDark);
    body.classList.toggle("dark", isDark);
  };

  const darkTheme = () => {
    localStorage.theme = "dark";
    applyTheme();
    setOpen(false);
  };
  const lightTheme = () => {
    localStorage.theme = "light";
    applyTheme();
    setOpen(false);
  };
  const systenTheme = () => {
    localStorage.removeItem("theme");
    applyTheme();
    setOpen(false);
  };

  const getThemeIcon = (theme) => {
    console.log(theme);
    if (theme === "light") {
      return (
        <div className="flex items-center gap-2">
          <IoSunny /> Light
        </div>
      );
    } else if (theme === "dark") {
      return (
        <div className="flex items-center gap-2">
          <IoMdMoon /> Dark
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <MdOutlineLaptopWindows /> System
        </div>
      );
    }
  };

  return (
    <div className="flex justify-center relative dark:text-white">
      <div className="relative wpx] p-1 text-left bg-gray-300 dark:bg-[#1a1a1a] space-x-2 rounded flex items-center justify-end">
        <span className="px-2 font-bold">Preferences:</span>
        <button
          className="flex items-center justify-between rounded bg-[#f1f1f1] dark:bg-[#0a0a0a] p-3 w-[120px]"
          onClick={() => setOpen(!open)}
        >
          {/* {localStorage.theme || "system"} */}
          {getThemeIcon(localStorage.theme)}
          <RxCaretDown />
        </button>
      </div>
      {open && (
        <div className="absolute right-0 mt-5 w-32 dark:bg-[#1a1a1a] bg-[#f1f1f1] shadow-lg rounded z-10 top-10 overflow-hidden">
          <button
            onClick={lightTheme}
            className="block w-full px-4 py-2  hover:bg-gray-300 dark:hover:bg-black cursor-pointer"
          >
            Light
          </button>
          <button
            onClick={darkTheme}
            className="block w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-black cursor-pointer"
          >
            Dark
          </button>
          <button
            onClick={systenTheme}
            className="block w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-black cursor-pointer"
          >
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default PreferenceToggle;
