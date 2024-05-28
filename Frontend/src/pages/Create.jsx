import NoteForm from "../components/NoteForm";

export default function Create() {
  return (
    <section className="px-10 mt-10">
      <NoteForm isCreate={true} />
    </section>
  );
}
