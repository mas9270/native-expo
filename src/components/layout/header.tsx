import Image from "next/image";
import NavLink from "../custom/navLink";
import { ToggleTheme } from "../custom/toggleTheme";
import UserConfig from "../custom/userConfig";

export default function header() {

  
  return (
    <header className="w-full py-3 shadow flex justify-center dark:shadow-gray-700">
      <nav className="w-full flex justify-between max-w-5xl px-3">
        <div className="flex gap-5">
          <Image
            src={"/images/logo2.png"}
            alt="logo"
            width={50}
            height={25}
            className="rounded-[100%] bg-white"
          />
          <NavLink />
        </div>
        <div className="flex gap-2 items-center">
          <ToggleTheme />
          <UserConfig />
        </div>
      </nav>
    </header>
  );
}
