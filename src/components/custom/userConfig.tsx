"use client";

import { useEffect, useState } from "react";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import { reactToastify } from "@/utils/toastify";
import { Loader2 } from "lucide-react";
import UserInfoHeader from "./userInfoHeader";

export default function UserConfig() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/auth/cookie")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setTokenInfo(res.data);
        } else {
          setTokenInfo(null);
          reactToastify({
            type: "warning",
            message: res.message,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setTokenInfo(null);
        reactToastify({
          type: "error",
          message: err.message,
        });
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <div className={`${tokenInfo ? "" : "hidden"}`}>
            <UserInfoHeader userInfo={tokenInfo}/>
          </div>
          <div
            className={`${
              !tokenInfo ? "" : "hidden"
            } flex content-center gap-1`}
          >
            <LoginForm />
            <RegisterForm />
          </div>
        </>
      )}
    </div>
  );
}
