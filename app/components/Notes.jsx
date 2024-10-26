import Note from "./Note/Note";

const colors = [
  "rgba(232,28,76,0.7)",
  "rgba(232,28,175,0.7)",
  "rgba(28,85,232,0.7)",
  "rgba(118,28,232,0.7)",
  "rgba(255,0,6,0.7)",
  "rgba(255,61,0,0.7)",
];

function Notes({ notes }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
      {notes.map((note, index) => (
        <Note key={note.id} note={note} color={colors[index]} />
      ))}
    </div>
  );
}

export default Notes;
