"use client";

import { updateNote } from "@/app/serverActions/noteActions";
import { useState } from "react";

function UpdateForm({ title, content, id }) {
  const [data, setData] = useState({ title, content });
  function handleInput(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <form className="flex flex-col gap-5 my-8" action={updateNote}>
      <label htmlFor="title">Title</label>
      <input
        className="border rounded p-2 pl-5"
        type="text"
        name="title"
        placeholder="Enter title here"
        value={data.title}
        onChange={handleInput}
      />
      <label htmlFor="content">Content</label>
      <textarea
        className="border rounded p-2 pl-5"
        name="content"
        rows={7}
        placeholder="Enter content here"
        value={data.content}
        onChange={handleInput}
      />
      <input type="hidden" value={id} name="id" />
      <button
        type="submit"
        className="mx-3 p-2 mt-5 font-medium rounded-md bg-black hover:bg-slate-200 text-white hover:text-black"
      >
        Update note
      </button>
    </form>
  );
}

export default UpdateForm;
