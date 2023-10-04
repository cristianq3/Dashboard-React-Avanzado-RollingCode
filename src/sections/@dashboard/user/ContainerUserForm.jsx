import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { CreateUserForm } from '../../../sections/@dashboard/user/CreateUserForm';

const ContainerUserForm = () => {
  return (
    <>
      <CssBaseline />
      {/* Box de Contener el Perfil de Usuario */}
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          <CreateUserForm /> 
        </Box>
      </Box>
    </>
  )
};

export default ContainerUserForm;