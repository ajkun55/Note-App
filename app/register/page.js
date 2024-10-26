"use client";

import { useState } from "react";
import { registerUser } from "../serverActions/userActions";
import { useRouter } from "next/navigation";

const Page = () => {
  const [info, setInfo] = useState({ username: "", email: "", password: "" });
  const [feedback, setFeedback] = useState({ type: "", msg: "" });
  const [pending, setPending] = useState(false);
  const router = useRouter();

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!info.username || !info.email || !info.password) {
      setFeedback((prev) => ({
        ...prev,
        type: "error",
        msg: "Must provide all value",
      }));
      return;
    }
    setPending(true);
    try {
      const res = await registerUser(info);
      if (res?.error) {
        setFeedback((prev) => ({
          ...prev,
          type: "error",
          msg: res.error,
        }));
      } else {
        setPending(false);
        setFeedback((prev) => ({
          ...prev,
          type: "success",
          msg: "Account successfully registered. Redirecting...",
        }));
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setPending(false);
      setFeedback((prev) => ({
        ...prev,
        type: "error",
        msg: "Something went wrong",
      }));
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-center">Register</h3>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col my-8 gap-5 font-semibold"
      >
        <label htmlFor="username">Username</label>
        <input
          className="border rounded p-2 pl-5"
          type="text"
          name="username"
          value={info.username}
          onChange={(e) => handleInput(e)}
        />
        <label htmlFor="email">Email</label>
        <input
          className="border rounded p-2 pl-5"
          type="email"
          name="email"
          value={info.email}
          onChange={(e) => handleInput(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="border rounded p-2 pl-5"
          type="password"
          name="password"
          value={info.password}
          onChange={(e) => handleInput(e)}
        />
        {feedback.msg}
        <button
          type="submit"
          className="mx-3 p-2 mt-5 font-medium rounded-md bg-black hover:bg-slate-200 text-white hover:text-black"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Page;
