"use client";
import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-0 min-h-screen min-w-full bg-background flex flex-col">
      <nav className="border-b border-border shadow-inner">
        <div className="flex justify-between h-16 mx-16 py-2 items-center">
          <Logo />
          <div className="flex gap-4 items-center">
            <ThemeSwitcher />
            <UserButton />
          </div>
        </div>
      </nav>
      <main className="flex w-full flex-grow mx-auto container flex-col">
        {children}
      </main>
    </div>
  );
}
