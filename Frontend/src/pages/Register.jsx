import React from "react";
import AuthForm from "../components/AuthForm";

export default function Register() {
  return (
    <section className="relative h-[100vh] overflow-y-scroll w-full lg:px-10  px-4 py-10 pb-20">
      <AuthForm isLogin={false} />
    </section>
  );
}
