"use client";

import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { deleteNote } from "@/app/serverActions/noteActions";

function DeleteBtn({ id }) {
  async function handleDelete() {
    const msg = toast.loading("Deleting note...");
    const res = await deleteNote(id);
    toast.dismiss(msg);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Note Deleted Successfully.");
    }
  }
  return (
    <MdDelete
      className="cursor-pointer fill-white hover:fill-yellow-400"
      onClick={handleDelete}
    />
  );
}

export default DeleteBtn;
