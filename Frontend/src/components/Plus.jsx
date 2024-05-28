import { PlusIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

export default function Plus() {
  return (
    <Link
      to={"/create"}
      className="absolute animate-bounce bottom-24 right-24 bg-teal-600
       w-14 h-14 cursor-pointer  rounded-full text-white"
    >
      <PlusIcon />
    </Link>
  );
}
