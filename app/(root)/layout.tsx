import { Toaster } from "@/components/ui/toaster";
import Navbar from "../../components/Navbar";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="font-work-sans">
        <Navbar />
        {children}
        <Toaster />
      </main>
    </>
  );
}

export default layout;
