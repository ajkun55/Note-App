"use server";

import { auth } from "@/auth";
import Note from "@/models/noteModel";
import User from "@/models/userModel";
import { connectDB } from "@/utils/connectdb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNote(formData) {
  try {
    const { user } = await auth();
    const title = formData.get("title");
    const content = formData.get("content");
    await connectDB();
    await Note.create({ ownerId: user.id, title, content });
  } catch (error) {
    console.error(error);
    return { error: "Could not add note" };
  }
  redirect("/");
}

export async function deleteNote(id) {
  try {
    // const id = formData.get("id"); //when using form using server component no toast also with parameter formdata
    await connectDB();
    const note = await Note.findById(id);
    if (!note) return { error: "Note not found" };
    await Note.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    return { error: "Could not delete note" };
  }
  revalidatePath("/");
}

export async function updateNote(formData) {
  try {
    const title = formData.get("title");
    const content = formData.get("content");
    const id = formData.get("id");
    await connectDB();
    const note = await Note.findById(id);
    if (!note) return { error: "Note not found" };
    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();
  } catch (error) {
    console.error(error);
    return { error: "Could not update note" };
  }
  redirect("/");
}

export async function pinNote(id) {
  try {
    // const id = formData.get("id"); //when using server component with formData and no toast
    const { user } = await auth();
    await connectDB();
    const previouslyPinnedNote = await Note.findOne({
      ownerId: user.id,
      pinned: true,
    });
    const noteToPin = await Note.findById(id);
    if (previouslyPinnedNote && previouslyPinnedNote._id !== noteToPin._id) {
      previouslyPinnedNote.pinned = false;
      await previouslyPinnedNote.save();
    }
    noteToPin.pinned = !noteToPin.pinned;
    await noteToPin.save();
  } catch (error) {
    console.error(error);
    return { error: "Could not pin the note." };
  }
  revalidatePath("/");
}
