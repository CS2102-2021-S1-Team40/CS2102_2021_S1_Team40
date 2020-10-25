import { useState, useEffect } from "react";

export function useApi(uri, fetch_options) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(uri, fetch_options)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setData(result.data);
        } else {
          throw new Error(result.message);
        }
      })
      .catch((err) => alert(err));
  }, []);
  return data;
}
