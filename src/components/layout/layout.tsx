import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <Main>{children}</Main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
