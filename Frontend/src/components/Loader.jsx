
import { Bars } from "react-loader-spinner";

export default function Loader() {
  return (
    <Bars
      height="80"
      width="80"
      color="#0d9488"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
