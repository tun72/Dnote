import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Nav() {
  const { token, handelSetToken } = useUser();

  function handelLogout() {
    handelSetToken(null);
  }

  console.log(token);
  return (
    <nav className="bg-teal-50 flex items-center justify-between py-4 px-10">
      <Link to="/">
        <h1 className="text-teal-600 font-bold lg:text-2xl text-lg uppercase">
          Sharenote.io
        </h1>
      </Link>

      <div className="flex flex-col gap-2">
        {!!token && token.userEmail && (
          <p className="text-teal-600 font-bold lg:text-xl">
            {token.userEmail}
          </p>
        )}
        <ul className="flex items-center gap-5 text-teal-600 font-bold lg:text-xl text-base">
          {!token ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/create">Share Note</Link>
              </li>
              <li>
                <span className="cursor-pointer" onClick={handelLogout}>
                  Logout
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
