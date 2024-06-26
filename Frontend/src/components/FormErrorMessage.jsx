
import { ErrorMessage } from "formik";

export default function FormErrorMessage({name}) {
  return <span className="text-red-500"><ErrorMessage name={name} /></span>;
}
