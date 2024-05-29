import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import formatISO9075 from "date-fns/formatISO9075";
import { toast } from "react-toastify";

export default function Note({ note, fetchNote }) {
  const { _id, title, content, createdAt } = note;

  const handleDeleteNote = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/notes/${_id}/delete`,
        {
          method: "delete",
        }
      );

      console.log(response);
      if (!response.ok) throw new Error("Deleting Failed!");

      if (response.status === 204) {
        await fetchNote();
        toast.success("Successfully Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="lg:w-2/5 w-full shadow-lg p-4   border-t-4 border-t-teal-600 line-clamp-2">
      <h3 className="text-xl font-medium">{title}</h3>

      <p className="text-lg w-full  line-clamp-2 mt-2">{content}</p>

      <div className="flex items-center flex-wrap justify-between mt-4 border-t-2  pt-2 gap-3">
        <p>{formatISO9075(createdAt, { representation: "date" })}</p>
        <div className="flex items-center justify-end gap-3 cursor-pointer ">
          <TrashIcon
            width={22}
            className="text-red-500"
            onClick={handleDeleteNote}
          />
          <Link to={"/edit/" + _id}>
            <PencilSquareIcon width={22} className="text-teal-600" />
          </Link>
          <Link to={"/notes/" + _id}>
            <EyeIcon width={22} className="text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
