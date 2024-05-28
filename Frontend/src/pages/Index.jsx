import Note from "../components/Note";
import Plus from "../components/Plus";

export default function Index() {
  return (
    <section className="flex justify-center gap-4 px-10 mt-10 flex-wrap">
      <Note />
      <Note />
      <Note />
      <Note />
      <Plus />
    </section>
  );
}
