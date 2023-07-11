import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import PreviewIcon from "@mui/icons-material/Preview";
import OrderedItemsModal from "./OrderedItemsModal";

export default function AdminOrderMgmntTable({ orders }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState([]);
  const [activeRow, setActiveRow] = useState();

  useEffect(() => {
    if (orders && orders.length > 0) setData(orders);
  }, [orders]);


  const handleViewModal=(obj)=>{
    setActiveRow(obj);
    setOpen(true);
  }
  const columns = [
    {
      field: "createdAt",
      headerName: "Ordered on",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {moment(params.row.createdAt).format("DD/MM/YYYY")}
          </div>
        );
      },
    },
    {
      field: "orderId",
      headerName: "Order Id",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {params.row.orderId}
          </div>
        );
      },
    },
    {
      field: "buyerName",
      headerName: "Ordered By",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {params.row.buyerName}
          </div>
        );
      },
    },
    {
      field: "deliveryAddress",
      headerName: "Shipping Address",
      width: 400,
      editable: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {params.row.deliveryAddress}
          </div>
        );
      },
    },
    {
        field: "paymentStatus",
        headerName: "Payment Status",
        width: 100,
        editable: true,
        renderCell: (params) => {
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {params.row.paymentStatus}
            </div>
          );
        },
      },
    {
      field: "items",
      headerName: "See Items Ordered",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 70,
      renderCell: (params) => (
        <div
          onClick={() => handleViewModal(params.row)
          }
        >
          {" "}
          <PreviewIcon />
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {data && data.length > 0 && (
        <DataGrid
          rowHeight={50}
          rows={data}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          pageSizeOptions={[100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
      <OrderedItemsModal
        open={open}
        handleClose={handleClose}
        activeRow={activeRow}
      />
    </Box>
  );
}
