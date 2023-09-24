import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const MealsDataTable = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
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
      field: 'fullName',
      headerName: 'Full name',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: 'Jon',
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: 35,
    },
    {
      id: 2,
      lastName: 'Lannister',
      firstName: 'Cersei',
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: 42,
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: 'Jaime',
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: 45,
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: 'Arya',
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: 16,
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: 'Daenerys',
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: null,
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: null,
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: 150,
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: 'Ferrara',
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: 44,
    },
    {
      id: 8,
      lastName: 'Frances',
      firstName: 'Rossini',
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: 36,
    },
    {
      id: 9,
      lastName: 'Roxie',
      firstName: 'Harvey',
      email: 'joel@gmail.com',
      phone: '+4917681005650',
      age: 65,
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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

export default MealsDataTable