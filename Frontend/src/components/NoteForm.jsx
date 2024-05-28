import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import FormErrorMessage from "./FormErrorMessage";
import * as Yup from "yup";
export default function NoteForm({ isCreate }) {
  function handelSubmit(values) {
    console.log(values);
  }
  // custom
  // function validate(values) {
  //   const errors = {};
  //   if (values.title.trim().length < 10)
  //     errors.title = "Titile must at least 10 characters long.";
  //   if (values.about.trim().length < 30)
  //     errors.about = "Content must at least 30 characters long.";

  //   return errors;
  // }

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required!"),
    about: Yup.string()
      .min(10, "Content must be at least 10.")
      .max(30, "Conent should less than 30 characters")
      .required("Content is required!"),
  });
  const initialValues = {
    title: "",
    about: "",
  };
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold  text-teal-900">
          {isCreate ? "Create" : "Edit"} a new note
        </h1>
        <Link to="/">
          <ArrowLeftIcon className="w-9 h9 text-teal-600" />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        // validate={validate}
        validationSchema={NoteFormSchema}
        onSubmit={handelSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mt-4">
              <label htmlFor="title" className="font-medium block">
                Note Title
              </label>
              <Field
                type="text"
                name="title"
                className={`pl-2 outline-none text-lg border-2 border-teal-600  py-1 w-full rounded-lg ${
                  touched.title && errors.title && "border-red-500"
                }`}
                id="title"
              />
              <FormErrorMessage name={"title"} />
            </div>

            <div className="mt-4">
              <label htmlFor="about" className="font-medium block">
                About Note
              </label>
              <Field
                rows={"4"}
                as={"textarea"}
                name="about"
                className={`pl-2 outline-none text-lg border-2  border-teal-600 py-1 w-full rounded-lg ${
                  touched.about && errors.about && "border-red-500"
                }`}
                id="about"
              />
              <FormErrorMessage name={"about"} />
            </div>
            <button
              type="submit"
              className="bg-teal-600 w-full text-white mt-4 rounded-lg py-3"
            >
              Save note
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
