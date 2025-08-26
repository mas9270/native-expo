"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserInfoHeader(props: { userInfo: any }) {
  const { userInfo } = props;

  function exit() {
    fetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(() => {
      window.location.reload();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline" size="icon">
          <span className="sr-only">
            {userInfo?.username ? userInfo.username : ""}
          </span>
        </Button> */}
        <div> {userInfo?.username ? userInfo.username : ""}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuItem onClick={() => {}}>
          روشن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          تیره
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            exit();
          }}
        >
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
