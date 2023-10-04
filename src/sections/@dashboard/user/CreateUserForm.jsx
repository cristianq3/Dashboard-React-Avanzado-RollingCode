import { Button, Card, CardContent, CardHeader, Container, CssBaseline, Divider, Grid, TextField, Stack } from "@mui/material";

export const CreateUserForm = () => {
  return (
    <Container fixed>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item md={8}>
          <Card>
            <CardHeader title="Crear nuevo usuario"/>
            <CardContent>
              {/* formulario de crear Usuario */}
              <form >
                {/* Nombre Proveedora */}
                <Stack spacing={4}>
                  <Grid item className="pr-1"xs={12} md={5}>
                    <TextField
                      label="Proveedora (disabled)"
                      defaultValue="Nombre de prueba."
                      disabled
                      required
                      fullWidth
                      id=""
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  {/* Nombre de usuario */}
                  <Grid item className="pl-1" xs={12} md={3}>
                    <TextField
                      label="Usuario"
                      defaultValue="gerardo"
                      placeholder="Usuario"
                      fullWidth
                    />
                  </Grid>
                  {/* Email */}
                  <Grid item className="pl-1" xs={12} md={4}>
                    <TextField
                      label="Email"
                      placeholder="Email"
                      type="email"
                      fullWidth
                    />
                  </Grid>
                </Stack>
                {/* Nombre */}
                <Grid container spacing={2} className="mt-1">
                  <Grid item className="pr-1" xs={12} md={6}>
                    <TextField
                      label="Nombre/s"
                      defaultValue="Nombre"
                      placeholder="Nombre"
                      fullWidth
                    />
                  </Grid>
                  {/* Apellido */}
                  <Grid item className="pl-1" xs={12} md={6}>
                    <TextField
                      label="Apellido/s"
                      defaultValue="Apellido"
                      placeholder="Apellido"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                {/* Dirección */}
                <Grid container spacing={2}  className="mt-1">
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Dirección"
                      defaultValue="dirección de prueba"
                      placeholder="Dirección"
                      fullWidth
                    />
                  </Grid>
                  {/* Código Postal */}
                  <Grid item className="pl-1" xs={12} md={6}>
                    <TextField
                      label="Código Postal"
                      placeholder="Código Postal"
                      type="number"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                {/* Ciudad */}
                <Grid container spacing={2} className="mt-1">
                  <Grid item className="pr-1" xs={12} md={6}>
                    <TextField
                      label="Ciudad"
                      defaultValue="ciudad"
                      placeholder="Ciudad"
                      fullWidth
                    />
                  </Grid>
                  {/* Pais */}
                  <Grid item className="pl1" xs={12} md={6}>
                    <TextField
                      label="País"
                      defaultValue="País"
                      placeholder="País"
                      fullWidth
                    />
                  </Grid>        
                </Grid>
                {/* Descripción */}
                <Grid container spacing={2} >
                  <Grid item md={12} className="mt-3" xs={12}>
                    <TextField
                      label="Acerca de mi"
                      defaultValue="alguna descripción."
                      placeholder="Here can be your description"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                {/* Botón de Actualizar Perfil */}
                <Button
                  className="mt-3"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {/* Actualizar Perfil */}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="card-user">
            <div className="card-image">
              {/* <img
                alt="..."
                src=""
              ></img> */}
            </div>
            {/* Card de Perfil con una pequeña biografia */}
            <CardContent>
              <div className="author">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {/* <img
                    alt="..."
                    className="avatar border-gray"
                    src=""
                  ></img> */}
                  <h5 className="title">Nombre Completo</h5>
                </a>
                <p className="description">nombre de usuario</p>
              </div>
              <p className="description text-center">
                Bio
              </p>
            </CardContent>
           <Divider />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateUserForm;