import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function AuthLayout() {
  return (
    <>
      <Box sx={{ backgroundColor: 'info.lighter' }}>
        <Outlet />
      </Box>
    </>
  );
}
