import { DataGrid }  from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', flex: 0.25},
    { field: 'lastName', headerName: 'Apellido', flex: 1 },
    { field: 'firstName', headerName: 'Nombre', flex: 1 },
    { field: 'age', headerName: 'Edad', flex: 0.5},
  ];

  const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

  export const TableGridUser = () => {

    return (
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
        //   loading={isLoading}
          width={'100%'}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10,25]}
          checkboxSelection
          sx={{
              boxShadow: 2,
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
              '& .MuiDataGrid-columnHeader': {
                  fontSize: 15,
                  color: 'black',
                  backgroundColor: '#d4dcff'
              }
            }}
        />
      </div>
    );
  }
   