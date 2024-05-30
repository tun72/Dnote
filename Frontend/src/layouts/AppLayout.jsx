import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AppLayout() {



  return (
    <section className="max-w-5xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
      <Nav />
      <div className="relative h-[100vh] overflow-y-scroll w-full lg:px-10  px-4 py-10 pb-20">
        <Outlet />
      </div>
    </section>
  );
}
