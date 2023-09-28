import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormHelperText } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { AuthContext } from '../../../contexts/AuthContext';
import { useForm } from '../../../hooks/useForm';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const { state, login } = useContext(AuthContext)
  const navigate = useNavigate();
  const { formState, onInputChange } = useForm();
  const [showPassword, setShowPassword] = useState(false);


  const handleClick = (event) => {
    event.preventDefault();
    login(formState.email, formState.password);
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
      <TextField
          error={state.errorMessage.length > 0 ?  true : false}
          required
          autoFocus
          fullWidth
          id="email"
          label="Correo electronico"
          name="email"
          autoComplete="email"
          onChange={(event ) => onInputChange(event)}
        />

        <TextField
          error={state.errorMessage.length > 0 ?  true : false}
          name="password"
          label="Contraseña"
          required
          id="password"
          autoComplete="new-password"
          onChange={ (event ) => onInputChange(event) }
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

      <FormHelperText
              id="component-helper-text"
              sx={{ color:'red' }}
            >
              { state.errorMessage }
      </FormHelperText>

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
