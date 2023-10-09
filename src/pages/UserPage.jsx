import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UsersContext } from "../../src/contexts/UsersContext";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import users from "../_mock/user";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "firstname", label: "Nombre Completo", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "role", label: "Rol", alignRight: false },
  { id: "status", label: "Estado", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const { state, getListUsers, isLoading, deleteUser } = useContext(UsersContext);
  const [userDeleted, setUserDeleted] = useState(false)

  useEffect(() => {
    getListUsers();
    setUserDeleted(false);
    console.log(state.users);
  }, [isLoading, userDeleted]);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("firstname");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = state.users.map((n) => n.firstname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, firstname) => {
    const selectedIndex = selected.indexOf(firstname);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, firstname);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDelete = (idSelected) => {
    console.log(idSelected);
    // deleteUser(idSelected);
    Swal.fire({
      title: `¿Seguro que deseas eliminar el usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#76B0F1",
      cancelButtonColor: "#B72136",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(idSelected);
        setUserDeleted(true)
        Swal.fire({
          text: `Se eliminó el usuario correctamente`,
          icon: "success",
          timer: 1700,
          showConfirmButton: false,
        });
      }
    });

  };

  const handleEdit = (idSelected) => {
    console.log(idSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state.users.length) : 0;

  const filteredUsers = applySortFilter(
    state.users,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Dashboard: Usuarios | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>
          <Button
            variant="contained"
            href="/dashboard/user/new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nuevo Usuario
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={state.users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, firstname, lastname, email, role, status } =
                        row;
                      const selectedUser = selected.indexOf(firstname) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) =>
                                handleClick(event, firstname)
                              }
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {firstname + " " + lastname}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">{role}</TableCell>

                          {/* <TableCell align="left">
                            {status}
                          </TableCell> */}

                          <TableCell align="left">
                            <Label
                              color={
                                (status === "Inactivo" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="error" 
                              onClick={() => handleDelete(_id)}
                            >
                              Eliminar
                            </Button>

                            <Button
                              variant="outlined" 
                              as={Link} to={`edit/${_id}`}
                            >
                              Editar
                            </Button>
                            {/* <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenu}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            No hay coincidencias.
                          </Typography>

                          <Typography variant="body2">
                            No se encontraron resultados para la busqueda &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Asegúrate de escribir correctamente o
                            utilizar palabras completas.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            labelRowsPerPage={"Filas por página"}
            labelDisplayedRows={function defaultLabelDisplayedRows({
              from,
              to,
              count,
            }) {
              return `${from}–${to} de ${
                count !== -1 ? count : `more than ${to}`
              }`;
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={state.users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={(_id) => handleDelete(_id)}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Borrar
        </MenuItem>
      </Popover>
    </>
  );
}
