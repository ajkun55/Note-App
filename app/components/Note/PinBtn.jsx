"use client";
import { pinNote } from "@/app/serverActions/noteActions";
import toast from "react-hot-toast";
import { IoStar } from "react-icons/io5";

function PinBtn({ id, pinned }) {
  async function handlePin() {
    const msg = toast.loading("Pin note...");
    const res = await pinNote(id);
    toast.dismiss(msg);
    if (res?.error) {
      toast.error(res.error);
    } else {
      pinned
        ? toast.success("Note Unpinned Successfully.")
        : toast.success("Note Pinned Successfully.");
    }
  }
  return (
    <IoStar
      onClick={handlePin}
      className={`${
        pinned ? "fill-yellow-400" : "fill-white"
      } cursor-pointer hover:fill-yellow-400`}
    />
  );
}

export default PinBtn;
