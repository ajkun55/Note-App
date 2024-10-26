"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { authenticate } from "../serverActions/userActions";

function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div>
      <h3 className="text-2xl font-bold text-center">Login</h3>
      <form
        action={dispatch}
        className="flex flex-col my-8 gap-5 font-semibold"
      >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="border rounded p-2 pl-5" />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="border rounded p-2 pl-5"
        />
        {errorMessage && <span>{errorMessage}</span>}
        <button
          type="submit"
          className="mx-3 mt-5 p-2 font-medium rounded-md bg-black hover:bg-slate-200 text-white hover:text-black"
        >
          Login
        </button>
      </form>
      <div>
        <div>
          <p>Don&apos;t have account?</p>
          <span className="flex items-center justify-start gap-5">
            <p>Create one</p>
            <Link
              href="/register"
              className="font-medium inline-block text-blue-500 underline"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Page;
