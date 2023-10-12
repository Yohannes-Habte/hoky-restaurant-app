import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HandleData from '../../functions/HandleData';
import PageLoader from '../loader/PageLoader';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BsFillTrash3Fill } from 'react-icons/bs';
import axios from 'axios';
import ButtonLoader from '../loader/ButtonLoader';
import "./DataTable.scss"

const MealsDataTable = () => {
  // State variables for the drinks Id in the table
  const [indexes, setIndexes] = useState([]);
  // Global state variables
  // Display meals using useEffect Global Function
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/meals'
  );

  // State variables for the drinks Id in the table
  const [index, setIndex] = useState();

  // Delete single drink
  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/api/drinks/${index}`);
  };

  // Delete all drinks
  const handleDeleteAll = () => {
    console.log(index);
  };

  // Meal header
  const columns = [
    { field: '_id', headerName: 'Meal ID', width: 250 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Price', type: 'number', width: 100 },
    {
      field: 'discountedPrice',
      headerName: 'Discount',
      type: 'number',
      width: 70,
    },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
    { field: 'category', headerName: 'Category', width: 150 },

    {
      field: 'featured',
      headerName: 'Featured',
      sortable: false,
      width: 100,
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 70,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <Link to={'/users/userId'} className={'link'}>
              <FaExternalLinkAlt />
            </Link>
            <button
              onClick={() => handleDelete(params.row._id)}
              className="button"
            >
              <BsFillTrash3Fill />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="wrapper">
      <button onClick={handleDeleteAll} className="delete-btn">
        {loading && <ButtonLoader />}
        {loading && <span>Deleting...</span>}
        {!loading && <span>Delete</span>}
      </button>
      {loading ? (
        <PageLoader />
      ) : error ? (
        error
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            // Rows
            rows={data}
            getRowId={(row) => row._id}
            // Columns
            columns={columns}
            // Initial state
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            // Create search bar
            slots={{ toolbar: GridToolbar }}
            // Search a specific item
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            // Page size optons
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            //
            onRowSelectionModelChange={(ids) => {
              setIndexes(ids);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MealsDataTable;
