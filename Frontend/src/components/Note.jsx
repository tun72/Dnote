import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

export default function Note() {
  return (
    <div className="w-2/5 shadow-lg p-4  border-t-4 border-t-teal-600">
      <h3 className="text-xl font-medium ">Lorem ipsum, dolor sit amet.</h3>
      <p className="text-lg">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard
      </p>
      <div className="flex items-center justify-end gap-3 cursor-pointer">
        <TrashIcon width={22} className="text-red-500" />
        <Link to="/edit/testing">
          <PencilSquareIcon width={22} className="text-teal-600" />
        </Link>
        <Link to="/notes/testing">
          <EyeIcon width={22} className="text-gray-600" />
        </Link>
      </div>
    </div>
  );
}
