import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[320px]">
        <h1></h1>
      </section>
      <StartupForm />
    </>
  );
}

export default page;
