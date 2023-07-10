import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import OrderModal from "./OrderModal";
import moment from "moment";

export default function Table({ orderedItems, handleRefetch }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState([]);
  const [activeRow, setActiveRow] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (orderedItems && orderedItems.length > 0) setData(orderedItems);
  }, [orderedItems]);

  useEffect(() => {
    if (refresh) {
      handleRefetch();
    }
  }, [handleRefetch, refresh]);

  const columns = [
    { field: "orderId", headerName: "Ordered Id", width: 90 },
    {
      field: "createdAt",
      headerName: "Ordered on",
      width: 90,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {moment(params.row.createdAt).format("DD/MM/YYYY")}
          </div>
        );
      },
    },
    {
      field: "buyerName",
      headerName: "Ordered By",
      width: 150,
      editable: true,
    },
    {
      field: "image",
      headerName: "Ordered Item",
      width: 150,
      height: 200,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              alt="product-img"
              style={{ width: "84px", height: "auto" }}
              src={`${params.row.orderedItems.image}`}
            />
            <p>{params.row.orderedItems.title}</p>
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 110,
      editable: true,
      valueGetter: (params) => {
        return `${params.row.orderedItems.quantity}`;
      },
    },
    {
      field: "deliveryAddress",
      headerName: "Delivery Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: "orderedItems",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) => {
        return `${params.row.orderedItems.status}`;
      },
    },
    {
      field: "shipping details",
      headerName: "Shipping Details",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) => {
        if (params.row.orderedItems.shippingCompany) {
          return `${params.row.orderedItems.shippingCompany} ${params.row.orderedItems.trackingNumber}`;
        } else return "NA";
      },
    },

    {
      field: "action",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 70,
      renderCell: (params) => (
        <div
          style={{
            visibility:
              params.row.orderedItems.status === "DELIVERED" || params.row.orderedItems.status === "CANCELLED" ? "hidden" : "",
          }}
          onClick={() => {
            setActiveRow(params.row);
            setOpen(true);
          }}
        >
          {" "}
          <EditIcon />
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {data && data.length > 0 && (
        <DataGrid
          rowHeight={150}
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
      <OrderModal
        open={open}
        handleClose={handleClose}
        activeRow={activeRow}
        setRefresh={setRefresh}
      />
    </Box>
  );
}
