import {
  ArrowLeftCircleIcon,
  CalendarDaysIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { formatISO9075 } from "date-fns/formatISO9075";
import { Link, redirect, useLoaderData } from "react-router-dom";

export default function Detail() {
  const note = useLoaderData();

  if (!note) {
    return (
      <p className="text-teal-600 font-bold text-2xl text-center">
        No content found!
      </p>
    );
  }
  return (
    <section>
      <Link
        to="/"
        className="text-teal-600 text-lg font-bold flex items-center gap-1 mb-4"
      >
        <ArrowLeftCircleIcon className="w-6 h-6" /> Back
      </Link>
      <div className="shadow-lg p-4  border-t-4 border-t-teal-600">
        <div className="flex justify-between font-medium">
          <p className="text-xl flex gap-1">
            <UserIcon width={24} /> {note?.userId?.username}
          </p>
          <p className="flex gap-1 items-center">
            <CalendarDaysIcon width={24} />{" "}
            {formatISO9075(note?.createdAt, { representation: "date" })}
          </p>
        </div>
        <h3 className="text-xl font-medium mt-4">
          {note?.title || "No title"}
        </h3>
        <p className="text-lg">{note?.content || "No content"}</p>

        <div className="w-full lg:h-[32rem] mt-4 h-[15rem]">
          {note?.imgUrl ? (
            <img
              src={import.meta.env.VITE_API + "/" + note?.imgUrl}
              className="w-full h-full"
              alt=""
            />
          ) : (
            <p className="text-center text-teal-600 font-bold text-3xl pt-10">No Preview Image</p>
          )}
        </div>
      </div>
    </section>
  );
}

export async function loader({ _, params }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API}/notes/${params.id}`
    );
    const data = await response.json();

    console.log(data);
    return data?.note || {};
  } catch (err) {
    return null;
  }
}
