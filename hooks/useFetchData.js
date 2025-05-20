import axios from "axios";
import { useState, useEffect } from "react";

function useFetchData(apiEndpoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiEndpoint);
        setAlldata(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (apiEndpoint) {
      fetchAllData();
    }
  }, [apiEndpoint, initialLoad]);

  return { alldata, loading };
}

export default useFetchData;
