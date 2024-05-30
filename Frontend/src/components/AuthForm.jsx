import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import FormErrorMessage from "./FormErrorMessage";
import * as Yup from "yup";
import { Link, json, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

export default function AuthForm({ isLogin }) {
  const { handelSetToken } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
          .min(5, "Username is too short!")
          .max(30, "Username is too long!")
          .required("Username is required!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Please enter an vaild email!"),
    password: Yup.string()
      .min(4, "Password is too short!")
      .required("Password is required!"),
  });

  async function handelSubmit(values) {
    // console.log(values);

    let URL = `${import.meta.env.VITE_API}/auth/register`;
    let method = "post";

    if (isLogin) {
      URL = `${import.meta.env.VITE_API}/auth/login`;
    }

    try {
      setIsLoading(true);
      console.log(URL);
      const response = await fetch(URL, {
        method,
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      if (response.status === 200) {
        console.log(data);
        handelSetToken({ token: data.token, userId: data.userId });
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
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
  }
  return (
    <section className="lg:w-[60%] mx-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold  text-teal-900">
          {isLogin ? "Login to your" : "Register a new"} account
        </h1>
        <Link to="/">
          <ArrowLeftIcon className="w-9 h9 text-teal-600" />
        </Link>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handelSubmit}
        validationSchema={AuthFormSchema}
      >
        {({ errors, touched }) => (
          <Form>
            {!isLogin && (
              <div className="mt-4">
                <label htmlFor="username" className="font-medium block">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className={`pl-2 outline-none text-lg border-2  py-1 w-full rounded-lg ${
                    touched.username && errors.username
                      ? "border-red-500"
                      : "border-teal-600"
                  }`}
                />
                <FormErrorMessage name={"username"} />
              </div>
            )}

            <div className="mt-4">
              <label htmlFor="email" className="font-medium block">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`pl-2 outline-none text-lg border-2  py-1 w-full rounded-lg ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-teal-600"
                }`}
              />
              <FormErrorMessage name={"email"} />
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="font-medium block">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className={`pl-2 outline-none text-lg border-2  py-1 w-full rounded-lg ${
                  touched.password && errors.password
                    ? "border-red-500"
                    : "border-teal-600"
                }`}
              />
              <FormErrorMessage name={"password"} />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-teal-600 w-full text-white mt-4 rounded-lg py-3"
            >
              {!!isLoading && "Loading..."}
              {!isLoading ? (isLogin ? "Sign In" : "Sign Up") : ""}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
