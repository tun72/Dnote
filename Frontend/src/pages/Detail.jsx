import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import { Link, useLoaderData } from "react-router-dom";

export default function Detail() {
  const note = useLoaderData();
  return (
    <section className="px-10 mt-10">
      <Link
        to="/"
        className="text-teal-600 text-lg font-bold flex items-center gap-1 mb-4"
      >
        <ArrowLeftCircleIcon className="w-6 h-6" /> Back
      </Link>
      <div className="shadow-lg p-4  border-t-4 border-t-teal-600">
        <h3 className="text-xl font-medium ">{note?.title || "No title"}</h3>
        <p className="text-lg">{note?.content || "No content"}</p>

        <div className="w-full lg:h-[32rem] mt-4 h-[15rem]">
          <img
            src={import.meta.env.VITE_API + "/" + note?.imgUrl}
            className="w-full h-full"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export async function loader({ _, params }) {
  const response = await fetch(
    `${import.meta.env.VITE_API}/notes/${params.id}`
  );
  const data = await response.json();

  console.log(data);
  return data?.note || {};
}
