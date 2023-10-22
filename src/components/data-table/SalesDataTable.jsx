import { Box, Button, Container, Modal } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useState } from "react";
import Carousel from "../carousel/Carousel";
import { fDate } from "../../utils/formatTime";
import useSales from "../../hooks/useSales";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
    sortable: false,
  },
  {
    field: "fecha",
    headerName: "Fecha",
    width: 160,
  },
  {
    field: "comprador",
    headerName: "Comprador",
    sortable: false,
    width: 160,
  },
  {
    field: "valor",
    headerName: "Valor",
    type: "number",
    width: 130,
    sortable: false,
    headerAlign: "left",
    align: "left",
  },

  {
    field: "productos",
    headerName: "Productos",
    renderCell: (products) => <BasicModal products={products.value} />,
    sortable: false,
    width: 160,
  },
];

const BasicModal = ({ products }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Ver productos</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Carousel products={products} />
        </Box>
      </Modal>
    </div>
  );
};

export function SalesDataTable() {
  const { sales, isLoading, error } = useSales();
  const rowsWithFormat = sales?.map((sale) => ({
    id: sale._id,
    comprador: `${sale.user.firstname} ${sale.user.lastname}`,
    productos: sale.cartProducts,
    valor: new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(sale.totalPrice),
    fecha: fDate(sale.saleDate, "dd MMMM yyyy"),
  }));

  const rowsWithFormatSorted = rowsWithFormat?.sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Container>
        <DataGrid
          rows={isLoading ? [] : rowsWithFormatSorted}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          column
          pageSizeOptions={[5, 10]}
          rowSelection={false}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Container>
    </div>
  );
}
