import { useEffect, useState } from 'react';
import axios from 'axios';

const Fetch = (url) => {
  // State variables for fetching data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // To display data on the browser from the backend using useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BACKEND_URL + url
        );
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  // Function to refetch data from the backend to the frontend
  const reFetch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + url);
      setData(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  // Function to delete data
  const deleteData = async () => {
    setLoading(true);
    try {
      await axios.delete(process.env.REACT_APP_BACKEND_URL + url);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };


  return { data, loading, error, reFetch, deleteData };
};

export default Fetch;
