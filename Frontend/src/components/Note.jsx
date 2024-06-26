import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { Link, redirect, useSearchParams } from "react-router-dom";
import formatISO9075 from "date-fns/formatISO9075";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { isValidJSON } from "../utils/isLogin";

export default function Note({ note, fetchNote }) {
  const { _id, title, content, createdAt, userId } = note;
  const { token, handelSetToken } = useUser();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const page = +searchParams.get("page") || 1;

  const handleDeleteNote = async () => {
    try {
      let localToken = localStorage.getItem("token");

      if (!isValidJSON(localToken)) {
        handelSetToken(null);
        throw new Error("Auth Error! Invalid Token!");
      }

      localToken = JSON.parse(localToken);

      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API}/notes/${_id}/delete`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localToken?.token}`,
          },
        }
      );

      if (response.status === 401) {
        handelSetToken(null);
        throw new Error("Auth Error! Invalid Token");
      }

      if (!response.ok) throw new Error("Deleting Failed!");

      if (response.status === 204) {
        await fetchNote(page);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:w-2/5 w-full shadow-lg p-4   border-t-4 border-t-teal-600 line-clamp-2">
      <h3 className="text-xl font-medium">{title}</h3>

      <p className="text-lg w-full  line-clamp-2 mt-2">{content}</p>

      <div className="flex items-center flex-wrap justify-between mt-4 border-t-2  pt-2 gap-3">
        <p>{formatISO9075(createdAt, { representation: "date" })}</p>
        <div className="flex items-center justify-end gap-3 cursor-pointer ">
          {token && userId.toString() === token.userId && (
            <>
              <button onClick={handleDeleteNote} disabled={isLoading}>
                <TrashIcon width={22} className="text-red-500" />
              </button>

              <Link to={"/edit/" + _id}>
                <PencilSquareIcon width={22} className="text-teal-600" />
              </Link>
            </>
          )}
          <Link to={"/notes/" + _id}>
            <EyeIcon width={22} className="text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
