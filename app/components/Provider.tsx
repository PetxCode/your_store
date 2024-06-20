"use client";
import React, { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface iSession {
  children: ReactNode;
}

const Provider: FC<iSession> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
