import {
    Modal,
    Box,
    Typography,
    // Select,
    // MenuItem,
    Container,
    Button,
    // TextField,
} from "@mui/material";
import { verifySeller } from "../apis/admin/verifySeller"
import { useState } from "react";

const style = {
    position: "absolute",
    textAlign: "center",
    top: "50%",
    left: "50%",
    width: "80%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "95vh",
    overflowY: "scroll",
};

const DocumentModal = ({ opendoc, activeRow, handleDocClose, handleRefetch }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const [loading, setLoading] = useState(false)

    // alert("from doc modal")
    const handleVerify = async () => {
        setLoading(true)
        const res = await verifySeller(token, activeRow._id)
        if (res.data.statusCode === 200) {
            alert(res.data.statusMessage)
            handleRefetch()
            setLoading(false)
            handleDocClose()
            handleRefetch()
        }
    };
    return (
        <Modal
            open={opendoc}
            onClose={handleDocClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {!loading && <Typography id="modal-modal-title" variant="h6" component="h2">
                    Do you want to verify the user
                </Typography>}
                {loading && <Typography variant="h6">Kindly wait while we verify the seller</Typography>}
                {!loading && <Container
                    maxWidth="lg"
                    sx={{
                        padding: "0px",
                        paddingTop: "20px",
                        textAlign: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {activeRow?.verificationDoc.length > 0 && (
                        <Container>
                            <Typography>{activeRow.verificationDoc[0].gstNumber}</Typography>

                            {activeRow.verificationDoc[0].gstDoc.map((item, id) => {
                                return (
                                    <img
                                        style={{ height: "auto", width: "80%" }}
                                        src={item}
                                        key={id}
                                        alt={`${id}`}
                                    />
                                );
                            })}
                            <Typography>{activeRow.verificationDoc[0].idNumber}</Typography>

                            {activeRow.verificationDoc[0].idProof.map((item, id) => {
                                return (
                                    <img
                                        style={{ height: "auto", width: "50%" }}
                                        src={item}
                                        key={id}
                                        alt={`${id}`}
                                    />
                                );
                            })}
                            <Typography>
                                {activeRow.verificationDoc[0].addressProofId}
                            </Typography>

                            {activeRow.verificationDoc[0].addressProof.map((item, id) => {
                                return (
                                    <img
                                        style={{ height: "auto", width: "80%" }}
                                        src={item}
                                        key={id}
                                        alt={`${id}`}
                                    />
                                );
                            })}
                        </Container>
                    )}
                    <div className="delete-confirmation-modal-btnDiv">
                        <Button variant="contained" onClick={() => handleVerify()}>
                            Yes
                        </Button>
                        <Button variant="contained" onClick={() => handleDocClose()}>
                            Cancel
                        </Button>
                    </div>
                </Container>}
            </Box>
        </Modal>
    );
};
export default DocumentModal;
