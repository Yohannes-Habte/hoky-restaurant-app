import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HandleData from '../../../functions/HandleData';
import PageLoader from '../../loader/PageLoader';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BsFillTrash3Fill } from 'react-icons/bs';
import axios from 'axios';
import ButtonLoader from '../../loader/ButtonLoader';

const OrdersDataTable = () => {
  // State variables for the drinks Id in the table
  const [indexes, setIndexes] = useState([]);
  // Global state variables
  // Display meals using useEffect Global Function
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/reservations'
  );

  // Delete single drink
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/drinks/${id}`);
  };

  // Delete all drinks
  const handleDeleteAll = () => {
    console.log(indexes);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email Addres', width: 130 },
    { field: 'phone', headerName: 'Phone Number', width: 150 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
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
    <div className="table-container">
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

export default OrdersDataTable;
