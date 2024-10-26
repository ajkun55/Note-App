import Note from "@/models/noteModel";
import { connectDB } from "@/utils/connectdb";
import UpdateForm from "./updateForm";

async function fetchNote(id) {
  try {
    await connectDB();
    const note = await Note.findById(id);
    if (!note) return { error: "note not found" };
    return note;
  } catch (error) {
    console.error(error);
    return { error: "Could not get the note" };
  }
}

async function Page({ params }) {
  const data = await fetchNote(params.id);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Update Note</h2>
      <UpdateForm
        title={data.title}
        content={data.content}
        id={data._id.toString()}
      />
    </div>
  );
}

export default Page;
