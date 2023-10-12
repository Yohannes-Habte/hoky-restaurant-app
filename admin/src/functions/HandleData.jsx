import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorMessage from '../components/messages/ErrorMessage';

const HandleData = (url) => {
  // State variables for fetching data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // To display data on the browser from the backend using useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        setError(toast.error(ErrorMessage(err)));
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  // Function to refetch data from the backend to the frontend
  const reFetch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch (err) {
      setError(toast.error(ErrorMessage(err)));
    }
    setLoading(false);
  };

  // Function to delete all data
  const deleteData = async () => {
    setLoading(true);
    try {
      await axios.delete(url);
    } catch (err) {
      setError(toast.error(ErrorMessage(err)));
    }
    setLoading(false);
  };

  // Function to post
  const postData = async (postingData) => {
    setLoading(true);
    try {
      await axios.post(url, postingData);
    } catch (err) {
      setError(toast.error(ErrorMessage(err)));
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch, deleteData, postData };
};

export default HandleData;
