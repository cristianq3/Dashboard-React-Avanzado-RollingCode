import { useState } from "react";
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

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="Nombre"
          autoFocus
        />

        <TextField
          required
          fullWidth
          id="lastName"
          label="Apellido"
          name="lastName"
          autoComplete="family-name"
        />

        <TextField
          required
          fullWidth
          id="email"
          label="Correo Electronico"
          name="mail"
          autoComplete="email"
        />

        <TextField
          name="password"
          label="Password"
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
