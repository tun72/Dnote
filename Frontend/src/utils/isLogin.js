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
      throw new Error("Auth Error");
    }
    const response = await fetch(`${import.meta.env.VITE_API}/auth/status`, {
      headers: {
        Authorization: `Bearer ${token?.token}`,
      },
    });
    console.log(response);
    if (response.status === 401) {
      throw new Error("Auth Error");
    }

    if (!response.ok) {
      throw new Error("Auth Error");
    }

    return null;
  } catch (err) {
    return err.message;
  }
};
