import { auth, signOut } from "@/auth";
import Link from "next/link";
import { handleSignOut } from "../serverActions/userActions";

async function Header() {
  // const { user } = await auth();
  const authResult = await auth();
  const user = authResult?.user || null;

  return (
    <div className="flex justify-between items-center border-b-4 pb-10">
      <Link href="/" className="skew-x-[-7deg]">
        <span className="bg-red-700 text-white font-bold p-3 text-2xl">
          NoteApp
        </span>
      </Link>

      {user ? (
        <form action={handleSignOut}>
          <button className="mx-3 p-2 font-medium rounded-md bg-black hover:bg-slate-200 text-white hover:text-black">
            logout
          </button>
        </form>
      ) : (
        <div>
          <Link
            href="/login"
            className="mx-3 p-2 font-medium rounded-md bg-black hover:bg-slate-200 text-white hover:text-black"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="p-2 font-medium rounded-md mx-3 bg-black hover:bg-slate-200 text-white hover:text-black"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
