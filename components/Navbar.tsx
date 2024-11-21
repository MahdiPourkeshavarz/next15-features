import { auth } from "@/auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

async function Navbar() {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-md text-black">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/next.svg" alt="_" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${session?.user.id}`}>
                {session.user.name}
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit">Login</button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
