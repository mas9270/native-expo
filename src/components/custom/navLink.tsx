"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appRoutes } from "@/constants/routes";

export default function NavLink() {
  const path = usePathname();

  return (
    <div className="flex">
      <div className="hidden gap-4 lg:flex">
        {appRoutes.map((item) => {
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm flex items-center  ${
                item.path === path ? "text-sky-500" : ""
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="lg:hidden">ساید بار</div>
    </div>
  );
}
