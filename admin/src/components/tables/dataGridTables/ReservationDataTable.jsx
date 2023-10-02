import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HandleData from '../../../functions/HandleData';
import PageLoader from '../../loader/PageLoader';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BsFillTrash3Fill } from 'react-icons/bs';
import axios from 'axios';
import ButtonLoader from '../../loader/ButtonLoader';

const ReservationDataTable = () => {
  // State variables for the drinks Id in the table
  const [index, setIndex] = useState();

  // Global state variables
  // Display meals using useEffect Global Function
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/reservations'
  );

  // Delete single reservation
  const handleDelete = async (userId) => {
    await axios.delete(`http://localhost:3000/api/users/${userId}`);
  };

  // Delete all reservations
  const handleDeleteAll = () => {
    console.log(index);
  };

  // Table header
  const columns = [
    { field: '_id', headerName: 'Reservation ID', width: 200 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email Addres', width: 200 },
    { field: 'phone', headerName: 'Phone Number', width: 130 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'time', headerName: 'Time', width: 70 },
    {
      field: 'persons',
      headerName: 'Persons',
      type: 'number',
      width: 50,
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
              setIndex(ids);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationDataTable;
