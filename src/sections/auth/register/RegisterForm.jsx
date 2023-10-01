import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { useForm } from '../../../hooks/useForm';
import { AuthContext } from '../../../contexts/AuthContext';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const {formState, onInputChange } = useForm()
  const [showPassword, setShowPassword] = useState(false);
  const {registerUser} = useContext(AuthContext)
  
  const handleClick = (event) => {
    event.preventDefault();
    registerUser(formState.firstname, formState.lastname, formState.email, formState.password)
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          autoComplete="given-name"
          name="firstname"
          required
          fullWidth
          id="firstname"
          label="Nombre"
          autoFocus
          onChange={(event ) => onInputChange(event)}
        />

        <TextField
          required
          fullWidth
          id="lastname"
          label="Apellido"
          name="lastname"
          autoComplete="family-name"
          onChange={(event ) => onInputChange(event)}
        />

        <TextField
          required
          fullWidth
          id="email"
          label="Correo electronico"
          name="email"
          autoComplete="email"
          onChange={(event ) => onInputChange(event)}
        />

        <TextField
          name="password"
          label="Contraseña"
          required
          id="password"
          autoComplete="new-password"
          type={showPassword ? "text" : "password"}
          onChange={(event ) => onInputChange(event)}
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

      <LoadingButton
        sx={{ mt: 3, mb: 2 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Registrarme
      </LoadingButton>
    </>
  );
}
