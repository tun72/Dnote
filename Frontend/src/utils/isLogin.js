import { redirect } from "react-router-dom";

// is valid JSON CRD FROM STACK OVERFLOW

export function isValidJSON(string) {
  return /^[\],:{}\s]*$/.test(
    string
      .replace(/\\["\\\/bfnrtu]/g, "@")
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        "]"
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  );
}

export const isLogin = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return redirect("/");
    }
    const response = await fetch(`${import.meta.env.VITE_API}/auth/status`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });
    console.log(response);
    if (!response.ok) {
      return redirect("/");
    }
    if (response.status === 401) {
      return redirect("/");
    }
    return [];
  } catch (err) {
    return redirect("/");
  }
};
