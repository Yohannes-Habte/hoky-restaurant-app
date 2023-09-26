import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

// Meal header
const columns = [
  { field: '_id', headerName: 'Meal ID', width: 250 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'price', headerName: 'Price', type: 'number', width: 70 },
  {
    field: 'discountedPrice',
    headerName: 'Discount',
    type: 'number',
    width: 70,
  },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },

  {
    field: 'featured',
    headerName: 'Featured',
    sortable: false,
    width: 70,
  },
];

const MealsDataTable = () => {
  // Local state variable
  const [data, setData] = useState([]);

  // Display reservations in the frontend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/meals`);
        setData(data);
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

export default MealsDataTable;
