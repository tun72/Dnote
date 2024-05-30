import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";

import Loader from "../components/Loader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Index() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;

  const fetchData = async (page = "") => {
    
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API}/notes/all?page=${page}`
      );
      if (!response.ok || response.status === 422) {
        throw new Error("Something Wrong");
      }

      if (response.status === 200) {
        const data = await response.json();
        setNotes(data.notes);
        setIsNext(data.nextPage);
        setIsPrev(data.prevPage);
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

  useEffect(() => {
    fetchData(page);
  }, [page]);

  function handelNext() {
    if (isNext) navigate("/?page=" + (+page + 1));
  }
  function handelPrev() {
    if (isPrev) navigate("/?page=" + (+page - 1));
  }

  return (
    <section className="flex justify-center gap-10 flex-wrap ">
      {!isLoading &&
        !!notes.length &&
        notes.map((note) => (
          <Note key={note._id} note={note} fetchNote={fetchData} />
        ))}

      {!isLoading && !notes.length && (
        <p className="text-teal-600 font-bold text-2xl">
          Notes are not created yet!
        </p>
      )}

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="w-full flex items-center justify-center gap-10">
          {isPrev && (
            <button
              className="bg-teal-600 text-white text-lg px-4 py-3 font-bold rounded-lg shadow-lg"
              onClick={handelPrev}
            >
              Prev Page
            </button>
          )}
          {isNext && (
            <button
              className="bg-teal-600 text-white text-lg px-4 py-3 font-bold rounded-lg shadow-lg"
              onClick={handelNext}
            >
              Next Page
            </button>
          )}
        </div>
      )}
      <Plus />
    </section>
  );
}
