import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { deleteNote, pinNote } from "../../serverActions/noteActions";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";
import PinBtn from "./PinBtn";

function Note({ note, color }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="p-4 rounded-xl min-h-40 grid grid-rows-3"
    >
      <h2 className="font-medium text-white">{note.title}</h2>
      <p className="my-3 text-slate-100">{note.content}</p>
      <div className="flex items-center justify-between mt-auto">
        <Link href={`/update/${note._id}`}>
          <FiEdit className="cursor-pointer fill-white hover:fill-yellow-400" />
        </Link>

        {/* //this is using server component withou toast
         <form action={pinNote}>
          <input type="hidden" name="id" value={note._id.toString()} />
          <button>
            <IoStar
              className={`${
                note.pinned ? "fill-yellow-400" : "fill-white"
              } cursor-pointer hover:opacity-50`}
            />
          </button>
        </form> */}
        <PinBtn id={note._id.toString()} pinned={note.pinned} />

        {/*  //no toast delete form server component
         <form action={deleteNote}>
          <input type="hidden" name="id" value={note._id.toString()} />
          <button type="submit">
            <MdDelete className="cursor-pointer fill-white" />
          </button>
        </form> */}
        <DeleteBtn id={note._id.toString()} />
      </div>
    </div>
  );
}

export default Note;
