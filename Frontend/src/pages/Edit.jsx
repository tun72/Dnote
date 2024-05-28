import NoteForm from "../components/NoteForm";

export default function Edit() {
  return (
    <section className="px-10 mt-10">
      <NoteForm isCreate={false} />
    </section>
  );
}
