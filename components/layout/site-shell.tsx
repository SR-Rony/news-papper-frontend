import { Header } from "./header";
import { Footer } from "./footer";
import { LocaleRefresh } from "./locale-refresh";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocaleRefresh />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
