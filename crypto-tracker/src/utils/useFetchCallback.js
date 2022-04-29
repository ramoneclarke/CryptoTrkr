import { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

const useFetchCallback = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCallback = useCallback(() => {
    setLoading(true);
    setData(null);
    setError(null);
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        res.data && setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [url]);

  return { fetchCallback, data, loading, error };
};

export default useFetchCallback;
