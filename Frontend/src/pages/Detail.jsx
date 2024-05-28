import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

export default function Detail() {
  return (
    <section className="px-10 mt-10">
      <Link to="/" className="text-teal-600 text-lg font-bold flex items-center gap-1 mb-4">
        <ArrowLeftCircleIcon className="w-6 h-6" /> Back
      </Link>
      <div className="shadow-lg p-4  border-t-4 border-t-teal-600">
        <h3 className="text-xl font-medium ">Lorem ipsum, dolor sit amet.</h3>
        <p className="text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard
        </p>
      </div>
    </section>
  );
}
