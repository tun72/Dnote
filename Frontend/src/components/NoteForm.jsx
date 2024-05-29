import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Field, Form, Formik } from "formik";
import {
  Link,
  json,
  useFetcher,
  useNavigate,
  useParams,
} from "react-router-dom";
import FormErrorMessage from "./FormErrorMessage";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function NoteForm({ isCreate }) {
  const [oldData, setOldData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();
  const fileRef = useRef();

  const { id } = useParams();
  useEffect(() => {
    if (isCreate) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);

        if (!response.ok) throw new Error("something wrong");
        const data = await response.json();
        console.log(data);
        setOldData(data.note);

        const previewImg = data.note.imgUrl
          ? import.meta.env.VITE_API + "/" + data.note.imgUrl
          : "";

        console.log(previewImg);
        setPreviewImg(previewImg);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, isCreate]);

  const initialValues = {
    title: isCreate ? "" : oldData?.title ?? "",
    content: isCreate ? "" : oldData?.content ?? "",
    imgUrl: isCreate ? "" : oldData?.imgUrl ?? "",
  };

  console.log(initialValues);

  function handelImageSubmit(e, setFieldValue) {
    const fileImg = e.target.files[0];
    if (fileImg) {
      setFieldValue("imgUrl", fileImg);
      setPreviewImg(URL.createObjectURL(fileImg));
    }
  }
  async function handelSubmit(values) {
    let URL = `${import.meta.env.VITE_API}/notes/create`;
    let method = "post";

    if (!isCreate) {
      URL = `${import.meta.env.VITE_API}/notes/${id}/update`;
      method = "put";
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("imgUrl", values.imgUrl);

    try {
      setIsLoading(true);
      const response = await fetch(URL, {
        method,
        body: formData,
        headers: {},
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      if (response.status === 201) {
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

  // custom
  // function validate(values) {
  //   const errors = {};
  //   if (values.title.trim().length < 10)
  //     errors.title = "Titile must at least 10 characters long.";
  //   if (values.about.trim().length < 30)
  //     errors.about = "Content must at least 30 characters long.";

  //   return errors;
  // }
  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required!"),
    content: Yup.string()
      .min(10, "Content must be at least 10.")
      .max(500, "Conent should less than 500 characters")
      .required("Content is required!"),
    imgUrl: Yup.mixed()
      .nullable()
      // .test(
      //   "FILE_FORMAT",
      //   "File type is not support.",
      //   (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      // ),
  });

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
        enableReinitialize={true}
        initialValues={initialValues}
        // validate={validate}
        validationSchema={NoteFormSchema}
        onSubmit={handelSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form encType="multipart/form-data">
            <div className="mt-4">
              <label htmlFor="title" className="font-medium block">
                Note Title
              </label>
              <Field
                type="text"
                name="title"
                className={`pl-2 outline-none text-lg border-2  py-1 w-full rounded-lg ${
                  touched.title && errors.title
                    ? "border-red-500"
                    : "border-teal-600"
                }`}
                id="title"
              />
              <FormErrorMessage name={"title"} />
            </div>

            <div className="mt-4">
              <label htmlFor="content" className="font-medium block">
                Note Content
              </label>
              <Field
                rows={"4"}
                as={"textarea"}
                name="content"
                className={`pl-2 outline-none text-lg border-2   py-1 w-full rounded-lg ${
                  touched.content && errors.content
                    ? "border-red-500"
                    : "border-teal-600"
                }`}
                id="content"
              />
              <FormErrorMessage name={"content"} />
            </div>

            <div
              className="mt-4 relative border-2 border-teal-600 border-dashed rounded-lg p-6"
              id="dropzone"
            >
              <div className="text-center">
                <img
                  className="mx-auto h-12 w-12"
                  src="https://www.svgrepo.com/show/357902/image-upload.svg"
                  alt=""
                />

                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  <label htmlFor="imgUrl" className="relative cursor-pointer">
                    <span>Drag and drop</span>
                    <span className="text-indigo-600"> or browse</span>
                    <span>to upload</span>
                    <input
                      id="imgUrl"
                      name="imgUrl"
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        handelImageSubmit(e, setFieldValue);
                      }}
                    />
                  </label>
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>

              {previewImg && (
                <img
                  src={previewImg}
                  className="mt-4 mx-auto max-h-40"
                  id="preview"
                  alt="preview"
                />
              )}
              <FormErrorMessage name={"imgUrl"} />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-teal-600 w-full text-white mt-4 rounded-lg py-3"
            >
              {isLoading ? "Saving..." : "Save note"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
