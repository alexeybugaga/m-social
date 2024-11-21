import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test task M-Social",
  description: "Test task M-Social (description)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={"body"}>{children}</body>
    </html>
  );
}
