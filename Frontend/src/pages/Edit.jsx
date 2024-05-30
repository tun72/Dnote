import { useLoaderData } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { useUser } from "../context/UserContext";

export default function Edit() {
  const error = useLoaderData();
  const { handelSetToken } = useUser();
  if (error) handelSetToken(null);
  return <NoteForm isCreate={false} />;
}
