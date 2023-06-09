import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import BlockIcon from "@mui/icons-material/Block";
import BlockUserConfirmationModal from "./BlockUserConfirmationModal";
import moment from "moment";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";
import DocumentModal from "./DocumentModal";

export default function UserSellerTable({ sellers, handleRefetch }) {
  const [open, setOpen] = useState(false);
  const [opendoc, setOpenDoc] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleDocClose = () => {
    setOpenDoc(false);
  };
  const [data, setData] = useState([]);
  const [activeRow, setActiveRow] = useState();

  const handleOpenDoc = (obj) => {
    setOpenDoc(true);
    setActiveRow(obj);
  };

  useEffect(() => {
    if (sellers && sellers.length > 0) setData(sellers);
  }, [sellers]);


  const columns = [
    { field: "_id", headerName: "Id", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      height: 200,
    },
    {
      field: "createdAt",
      headerName: "Joined on",
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
      field: "softDelete",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {params.row.softDelete ? "banned" : "active"}
          </div>
        );
      },
    },
    {
      field: "verified",
      headerName: "Verified",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {params.row.verified ? "verified" : "not verified"}
          </div>
        );
      },
    },
    {
      field: "verificationDoc",
      headerName: "Verfication Doc Uploaded",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {params.row.verificationDoc.length > 0 ? (
              <ContentPasteSearchOutlinedIcon
                onClick={() => handleOpenDoc(params.row)}
              />
            ) : (
              <ContentPasteOffOutlinedIcon />
            )}
          </div>
        );
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
          onClick={() => {
            setActiveRow(params.row);
            setOpen(true);
          }}
        >
          {" "}
          {params.row?.softDelete ? <LockOpenIcon /> : <BlockIcon />}
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
      <BlockUserConfirmationModal
        open={open}
        handleClose={handleClose}
        activeRow={activeRow}
        handleRefetch={handleRefetch}
      />
      <DocumentModal
        opendoc={opendoc}
        handleDocClose={handleDocClose}
        activeRow={activeRow}
        handleRefetch={handleRefetch}
      />
    </Box>
  );
}
