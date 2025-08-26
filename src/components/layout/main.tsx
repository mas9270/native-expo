import React from "react";

export default function Main(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <main className="w-full py-3 flex justify-center flex-1">
      <div className="w-full max-w-5xl px-3">{children}</div>
    </main>
  );
}
