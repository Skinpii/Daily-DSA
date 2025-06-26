import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomeLayout({ children }) {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
