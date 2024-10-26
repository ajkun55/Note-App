import { auth } from "@/auth";
import Note from "@/models/noteModel";
import Link from "next/link";
import { BsPlusSquareFill } from "react-icons/bs";
import Notes from "./components/Notes";
import Pagination from "./components/Pagination";
import { notFound } from "next/navigation";
import { connectDB } from "@/utils/connectdb";

async function getNotes(pageNumber) {
  try {
    await connectDB();
    let pageSize = 6;
    const { user } = await auth();
    const totalNotes = await Note.find({ ownerId: user.id }).countDocuments();
    if (totalNotes === 0) return "empty";

    const totalPage = Math.ceil(totalNotes / pageSize);
    if (pageNumber > totalPage || pageNumber < 1) return null;

    const pinnedNote = await Note.findOne({ ownerId: user.id, pinned: true });
    if (!pinnedNote) {
      const notes = await Note.find({ ownerId: user.id })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize);
      return { notes, totalPage };
    }
    const skip = Math.max((pageNumber - 1) * pageSize - 1, 0);
    const notes = await Note.find({ ownerId: user.id, pinned: false })
      .sort({ createdAt: -1 })
      .limit(pageSize - 1)
      .skip(skip);
    const combinedNotes = [pinnedNote, ...notes];
    return { notes: combinedNotes, totalPage };
  } catch (error) {
    console.error(error);
  }
}

export default async function Home({ searchParams }) {
  const pageNumber = parseInt(searchParams.pageNumber) || 1;
  const data = await getNotes(pageNumber);
  if (!data) notFound();
  if (data === "empty") {
    return (
      <div>
        <Link href="/add">
          <BsPlusSquareFill size={40} />
        </Link>

        <h1 className="my-5">You do not have any notes.</h1>
      </div>
    );
  }
  return (
    <div className="w-full">
      <Link href="/add">
        <BsPlusSquareFill size={40} className="hover:fill-slate-300" />
      </Link>

      <Notes notes={data.notes} />

      <Pagination currentPage={pageNumber} totalPage={data.totalPage} />
    </div>
  );
}
