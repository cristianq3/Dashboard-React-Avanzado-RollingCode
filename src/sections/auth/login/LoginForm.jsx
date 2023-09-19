import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { AuthContext } from '../../../contexts/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { state, login } = useContext(AuthContext)
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    login('juan@gmail.com', '12345');
    console.log(state.isLogged)
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
      <TextField
          required
          fullWidth
          id="email"
          label="Correo electronico"
          name="email"
          autoComplete="email"
        />

        <TextField
          name="password"
          label="Contraseña"
          required
          id="password"
          autoComplete="new-password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          ¿Olvidaste tu contraseña?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Iniciar sesión
      </LoadingButton>
    </>
  );
}
