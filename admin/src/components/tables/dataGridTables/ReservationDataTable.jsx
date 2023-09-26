import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// Table header
const columns = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email Addres', width: 130 },
  { field: 'phone', headerName: 'Phone Number', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'time', headerName: 'Time', width: 100 },
  {
    field: 'persons',
    headerName: 'Persons',
    type: 'number',
    width: 90,
  },
];

const ReservationDataTable = () => {
  // Local state variable
  const [data, setData] = useState([]);

  // Display reservations in the frontend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/reservations`
        );
        setData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default ReservationDataTable;
