import { Fragment, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  easing,
} from "@mui/material";
import { addSellerVerificationDoc } from "../../apis/sellerVerificationDoc/sellerVerificationDoc";
import { uploadImgs } from "../../apis/upload/uploadImgs";
import Loader from "../../components/Loader";
import { useCookies } from "react-cookie";

function removeElement(arr, ele) {
  const data = arr.filter((item) => {
    return item !== ele;
  });
  return data;
}

const SubmitVerificationDetails = () => {
  const params = useParams();
  const [gstDocfiles, setGstDocFiles] = useState([]);
  const [idProoffiles, setIdProofFiles] = useState([]);
  const [addressProofIdfiles, setAddressProofIdFiles] = useState([]);
  const [details, setDetails] = useState({
    gstNumber: "",
    gstDoc: "",
    idNumber: "",
    idProof: "",
    addressProofId: "",
    addressProof: "",
  });
  const [errors, setErrors] = useState([]);
  const [gstimgPreview, setGstImgPreview] = useState([]);
  const [idimgPreview, setIdImgPreview] = useState([]);
  const [addressimgPreview, setAddressImgPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["verified"]);
    const [show,setShow] = useState(false)
    

    useEffect(()=>{
      const submittedDoc = cookies.submittedVerDoc;
     if(submittedDoc === "true"){
      setShow(true)
     }
    },[cookies.submittedVerDoc])

  const handleSubmitVerificationDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (details.gstNumber === "")
      setErrors((oldArray) => [...oldArray, "gstNumber"]);
    if (details.idNumber === "")
      setErrors((oldArray) => [...oldArray, "idNumber"]);
    if (details.addressProofId === "")
      setErrors((oldArray) => [...oldArray, "addressProofId"]);
    if (gstimgPreview.length < 2) {
      setErrors((oldArray) => [...oldArray, "gstimgPreview"]);
    }
    if (idimgPreview.length < 2) {
      setErrors((oldArray) => [...oldArray, "idimgPreview"]);
    }
    if (addressimgPreview.length < 2) {
      setErrors((oldArray) => [...oldArray, "addressimgPreview"]);
    }
    const passTest =
      details.gstNumber !== "" &&
      details.idNumber !== "" &&
      details.addressProofId !== "" &&
      gstimgPreview.length === 2 &&
      idimgPreview.length === 2 &&
      addressimgPreview.length === 2;
    if (passTest) {
      const formData = new FormData();
      if (gstDocfiles.length > 0) {
        gstDocfiles.forEach((file, i) => {
          formData.append("images", file);
        });
        const uploadedRes = await uploadImgs(formData);
        if (uploadedRes.status) {
          details["gstDoc"] = [
            uploadedRes.data.urls[0],
            uploadedRes.data.urls[1],
          ];
        }
      }
      if (idProoffiles.length > 0) {
        idProoffiles.forEach((file, i) => {
          formData.append("images", file);
        });
        const uploadedRes = await uploadImgs(formData);
        if (uploadedRes.status) {
          details["idProof"] = [
            uploadedRes.data.urls[2],
            uploadedRes.data.urls[3],
          ];
        }
      }
      if (addressProofIdfiles.length > 0) {
        addressProofIdfiles.forEach((file, i) => {
          formData.append("images", file);
        });
        const uploadedRes = await uploadImgs(formData);
        if (uploadedRes.status) {
          details["addressProof"] = [
            uploadedRes.data.urls[4],
            uploadedRes.data.urls[5],
          ];
        }
      }
      if (
        details.gstDoc !== "" &&
        details.idProof !== "" &&
        details.addressProof !== ""
      ) {
        const res = await addSellerVerificationDoc(params.token, details);
        if (res.data.statusCode === 200) {
          setLoading(false);
          setGstImgPreview([]);
          setIdImgPreview([]);
          setAddressImgPreview([]);
          alert(res.data.statusMessage);
          localStorage.setItem("submittedDoc", true);
          
        }
      }
    } else {
      setLoading(false);
      return;
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    if (name === "gstNumber") {
      const data = removeElement(errors, "gstNumber");
      setErrors(data);
    }
    if (name === "idNumber") {
      const data = removeElement(errors, "idNumber");
      setErrors(data);
    }
    if (name === "addressProofId") {
      const data = removeElement(errors, "addressProofId");
      setErrors(data);
    }

    const value = e.target.value;
    details[name] = value;
    setDetails({ ...details });
  };

  const handleGstUploadFile = async (event) => {
    let file = event.target.files[0];
    setGstDocFiles([...gstDocfiles, file]);
    const data = removeElement(errors, "gstimgPreview");
    setErrors(data);
    const tempUrl = URL.createObjectURL(event.target.files[0]);
    if (gstimgPreview.length < 3) {
      setGstImgPreview([...gstimgPreview, tempUrl]);
    }
  };
  const handleIdUploadFile = async (event) => {
    let file = event.target.files[0];
    setIdProofFiles([...idProoffiles, file]);
    const data = removeElement(errors, "idimgPreview");
    setErrors(data);
    const tempUrl = URL.createObjectURL(event.target.files[0]);
    if (idimgPreview.length < 3) {
      setIdImgPreview([...idimgPreview, tempUrl]);
    }
  };
  const handleAddressUploadFile = async (event) => {
    let file = event.target.files[0];
    setAddressProofIdFiles([...addressProofIdfiles, file]);
    const data = removeElement(errors, "addressimgPreview");
    setErrors(data);
    const tempUrl = URL.createObjectURL(event.target.files[0]);
    if (addressimgPreview.length < 3) {
      setAddressImgPreview([...addressimgPreview, tempUrl]);
    }
  };
  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && !show && (
        <Container
          maxWidth="lg"
          sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: "18px" }}
          >
            Kindly submit the below information to verify your account
          </Typography>
          <Container maxWidth="md">
            <Box
              component="form"
              onSubmit={(e) => handleSubmitVerificationDetails(e)}
              //validate={true}
              sx={{ mt: 1 }}
            >
              <TextField
                error={errors.includes("gstNumber") ? true : false}
                autoFocus
                margin="normal"
                required
                fullWidth
                id="gstNumber"
                label="Gst Number"
                // value={product.title}
                name="gstNumber"
                autoComplete="off"
                inputProps={{ maxLength: 16 }}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                helperText={
                  errors.includes("gstNumner") ? "Incorrect entry." : ""
                }
              />
              <Container sx={{ mt: 6 }}>
                <Grid container direction={"row"} spacing={4} sx={{ mb: 6 }}>
                  {gstimgPreview.length > 0 &&
                    gstimgPreview.map((item, id) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          md={2}
                          sx={{
                            height: "110px",
                            width: "110px",
                            mb: 3,
                            position: "relative",
                            margin: "auto",
                          }}
                          key={id}
                        >
                          <img
                            key="id"
                            src={item}
                            alt="img"
                            style={{ height: "100px", width: "100px" }}
                          />
                          {/* <CancelIcon
                            style={{
                              position: "absolute",
                              left: isTabletOrMobile ? "66%" : "95%",
                              top: "19px",
                            }}
                            onClick={() => {
                              handleDeleteImages(id);
                            }}
                          /> */}
                        </Grid>
                      );
                    })}
                </Grid>
                {gstimgPreview.length < 2 ? (
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      accept="image/*"
                      name="images"
                      type="file"
                      hidden
                      onChange={(e) => {
                        handleGstUploadFile(e);
                      }}
                    />
                  </Button>
                ) : (
                  <p>You can add maximum of 2 images</p>
                )}
                {gstimgPreview.length < 2 && (
                  <p>Kindly add front and back images of gstin </p>
                )}
                {errors.includes("gstimgPreview") && (
                  <p style={{ color: "red" }}>Kindly upload the file image</p>
                )}
              </Container>

              <TextField
                error={errors.includes("idNumber") ? true : false}
                autoFocus
                margin="normal"
                required
                fullWidth
                id="idNumber"
                label="Id Number"
                // value={product.title}
                name="idNumber"
                autoComplete="off"
                inputProps={{ maxLength: 16 }}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                helperText={
                  errors.includes("idNumber") ? "Incorrect entry." : ""
                }
              />
              <Container sx={{ mt: 6 }}>
                <Grid container direction={"row"} spacing={4} sx={{ mb: 6 }}>
                  {idimgPreview.length > 0 &&
                    idimgPreview.map((item, id) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          md={2}
                          sx={{
                            height: "110px",
                            width: "110px",
                            mb: 3,
                            position: "relative",
                            margin: "auto",
                          }}
                          key={id}
                        >
                          <img
                            key="id"
                            src={item}
                            alt="img"
                            style={{ height: "100px", width: "100px" }}
                          />
                          {/* <CancelIcon
                            style={{
                              position: "absolute",
                              left: isTabletOrMobile ? "66%" : "95%",
                              top: "19px",
                            }}
                            onClick={() => {
                              handleDeleteImages(id);
                            }}
                          /> */}
                        </Grid>
                      );
                    })}
                </Grid>
                {idimgPreview.length < 2 ? (
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      accept="image/*"
                      name="images"
                      type="file"
                      hidden
                      onChange={(e) => {
                        handleIdUploadFile(e);
                      }}
                    />
                  </Button>
                ) : (
                  <p>You can add maximum of 2 images</p>
                )}
                {idimgPreview.length < 2 && (
                  <p>Kindly add front and back images</p>
                )}
                {errors.includes("idimgPreview") && (
                  <p style={{ color: "red" }}>Kindly upload the file image</p>
                )}
              </Container>
              <TextField
                error={errors.includes("addressProofId") ? true : false}
                autoFocus
                margin="normal"
                required
                fullWidth
                id="addressProofId"
                label="Address proof Id Number"
                // value={product.title}
                name="addressProofId"
                autoComplete="off"
                inputProps={{ maxLength: 16 }}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                helperText={
                  errors.includes("addressProofId") ? "Incorrect entry." : ""
                }
              />
              <Container sx={{ mt: 6 }}>
                <Grid container direction={"row"} spacing={4} sx={{ mb: 6 }}>
                  {addressimgPreview.length > 0 &&
                    addressimgPreview.map((item, id) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          md={2}
                          sx={{
                            height: "110px",
                            width: "110px",
                            mb: 3,
                            position: "relative",
                            margin: "auto",
                          }}
                          key={id}
                        >
                          <img
                            key="id"
                            src={item}
                            alt="img"
                            style={{ height: "100px", width: "100px" }}
                          />
                          {/* <CancelIcon
                            style={{
                              position: "absolute",
                              left: isTabletOrMobile ? "66%" : "95%",
                              top: "19px",
                            }}
                            onClick={() => {
                              handleDeleteImages(id);
                            }}
                          /> */}
                        </Grid>
                      );
                    })}
                </Grid>
                {addressimgPreview.length < 2 ? (
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      accept="image/*"
                      name="images"
                      type="file"
                      hidden
                      onChange={(e) => {
                        handleAddressUploadFile(e);
                      }}
                    />
                  </Button>
                ) : (
                  <p>You can add maximum of 2 images</p>
                )}
                {errors.includes("addressimgPreview") && (
                  <p style={{ color: "red" }}>Kindly upload the file image</p>
                )}
                {addressimgPreview.length < 2 && (
                  <p>Kindly add front and back images</p>
                )}
              </Container>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmitVerificationDetails(e)}
              >
               Sumbit document
              </Button>

              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            </Box>
          </Container>
        </Container>
      )}
      {show && <Container
          maxWidth="lg"
          sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: "18px" }}
          >
            Thank you for submitting your doc, You will be notified once your document is verified from our side.
          </Typography>
          </Container>}
    </Fragment>
  );
};
export default SubmitVerificationDetails;
