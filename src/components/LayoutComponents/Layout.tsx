import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div id="layout" className="font-sans flex min-h-screen flex-col justify-between">
      <Header />
      {/* Set min height to remainder of default viewport that isn't taken up by header/footer (which are 7vh each) */}
      <main className="min-h-[86vh]">{children}</main>
      <Footer />
    </div>
  );
}
