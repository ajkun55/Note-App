import { addNote } from "../serverActions/noteActions";

function Page() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center">Add Note</h3>
      <form action={addNote} className="flex flex-col my-8 gap-5">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title here"
          className="border rounded p-2 pl-5"
        />
        <label htmlFor="content">Note</label>
        <textarea
          className="border rounded p-2 pl-5"
          name="content"
          rows={7}
          placeholder="Enter content here"
        ></textarea>
        <button
          type="submit"
          className="mx-3 p-2 mt-5 font-medium rounded-md bg-black hover:bg-slate-200 text-white hover:text-black"
        >
          Add note
        </button>
      </form>
    </div>
  );
}

export default Page;
