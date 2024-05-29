import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="bg-teal-50 flex items-center justify-between py-4 px-10">
      <Link to="/">
        <h1 className="text-teal-600 font-bold lg:text-4xl text-2xl">Dnote.io</h1>
      </Link>
      <ul className="flex items-center gap-5 text-teal-600 font-bold lg:text-xl text-base">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
