import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Must provide a title"],
    },
    content: {
      type: String,
      required: [true, "Must provide an content"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Must have an owner id"],
    },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
