import React, { Fragment, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { catAvailable } from "../../helpers/helper";
import { uploadImgs } from "../../apis/upload/uploadImgs";
import { addProduct } from "../../apis/products/addProduct";
import Loader from "../../components/Loader";

const AddProduct = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [desc, setDesc] = useState([""]);
  let token = JSON.parse(localStorage.getItem("token"));
  const initialState = {
    title: "",
    description: [""],
    category: "",
    brand: "",
    price: "",
  };

  const [product, setProduct] = useState(initialState);

  const [files, setFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [loading, setLoading] = useState();

  const handleCatChange = (e) => {
    const value = e.target.value;
    product["category"] = value;
    setProduct({ ...product });
  };

  const handleNewDescription = () => {
    const tempDesc = "";
    setDesc((prevArray) => [...prevArray, tempDesc]);
  };

  const onChangeDescription = (e, id) => {
    const newArray = desc.map((v, i) => {
      if (i === id) return e.target.value;
      return v;
    });
    setDesc(newArray);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    product[name] = value;
    setProduct({ ...product });
  };

  const handleFile = async (event) => {
    let file = event.target.files[0];
    setFiles([...files, file]);
    const tempUrl = URL.createObjectURL(event.target.files[0]);
    if (imgPreview.length < 11) {
      setImgPreview([...imgPreview, tempUrl]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (files.length === 0) {
      alert("choose atleast 2 pics");
      setLoading(false);
      return;
    }
    product["description"] = desc;
    const passTest =
      product.title !== "" &&
      product.category !== "" &&
      product.brand !== "" &&
      product.price !== "" &&
      (product.description.length > 1 ||
        (product.description.length === 1 && product.description[0] !== ""));

    if (passTest) {
      if (files.length > 0) {
        files.forEach((file, i) => {
          formData.append("images", file);
        });
        const uploadedRes = await uploadImgs(formData);
        if (uploadedRes.status) {
          product["images"] = uploadedRes.data.urls;
          const res = await addProduct(token, product);
          if (res.data.statusCode === 200) {
            setLoading(false);
            setProduct(initialState);
            setFiles([]);
            setImgPreview([]);
            setDesc([]);
            alert(res.data.statusMessage);
          } else {
            setLoading(false);
            alert(res.data.statusMessage);
          }
        }
        if (!uploadedRes.status) {
          setLoading(false);
          alert(uploadedRes.statusMessage);
          return;
        }
      }
    } else {
      setLoading(false);
      alert("kindly fill all the fields");
    }
  };

  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && (
        <Container
          maxWidth="lg"
          sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {user}, Welcome to your Dashboard
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: "18px" }}
          >
            Kindly fill the form given below to sell new product
          </Typography>
          <Container maxWidth="md">
            <Box
              component="form"
              onSubmit={(e) => handleUpload(e)}
              //validate={true}
              sx={{ mt: 1 }}
            >
              <TextField
                //error={errorFields.includes("email") ? true : false}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Product Name"
                value={product.title}
                name="title"
                autoComplete="off"
                autoFocus
                inputProps={{ maxLength: 100 }}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                //   helperText={
                //     errorFields.includes("email") ? "Incorrect entry." : ""
                //   }
              />
              <TextField
                value={product.brand}
                // error={errorFields.includes("password") ? true : false}
                margin="normal"
                required
                fullWidth
                name="brand"
                label="Product brand"
                type="text"
                id="brand"
                autoComplete="off"
                onChange={onChangeHandler}
                //   helperText={
                //     errorFields.includes("password")
                //       ? "password cannot be empty"
                //       : ""
                //   }
              />
              <Container>
                {desc.map((item, id) => {
                  return (
                    <TextField
                      key={id}
                      value={item}
                      inputProps={{ maxLength: 200 }}
                      // error={errorFields.includes("password") ? true : false}
                      margin="normal"
                      required
                      fullWidth
                      name="description"
                      label={`Product Description${id + 1} - max 200 char`}
                      type="text"
                      id="description"
                      autoComplete="off"
                      onChange={(e) => {
                        onChangeDescription(e, id);
                      }}
                      //   helperText={
                      //     errorFields.includes("password")
                      //       ? "password cannot be empty"
                      //       : ""
                      //   }
                    />
                  );
                })}
                <Button
                  disabled={desc[desc.length - 1] === "" ? true : false}
                  onClick={handleNewDescription}
                >
                  Add New Description
                </Button>
              </Container>
              <Container
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Container>
                  {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={product.category}
                    defaultValue="select category"
                    label="category"
                    onChange={handleCatChange}
                    sx={{ width: "100%" }}
                  >
                    {catAvailable.map((item, id) => {
                      return (
                        <MenuItem key={id} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Container>
                <Container>
                  <TextField
                    value={product.price}
                    //error={errorFields.includes("email") ? true : false}
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Product Price"
                    name="price"
                    autoComplete="off"
                    autoFocus
                    inputProps={{ maxLength: 10 }}
                    onChange={onChangeHandler}
                    //   helperText={
                    //     errorFields.includes("email") ? "Incorrect entry." : ""
                    //   }
                  />
                </Container>
                <Container></Container>
              </Container>

              <Container sx={{ mt: 6 }}>
                <Grid container direction={"row"} spacing={4} sx={{ mb: 6 }}>
                  {imgPreview.length > 0 &&
                    imgPreview.map((item, id) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          md={2}
                          sx={{ height: "100px", width: "100px", mb: 3 }}
                        >
                          <img
                            key="id"
                            src={item}
                            alt="img"
                            style={{ height: "100px", width: "100px" }}
                          />
                        </Grid>
                      );
                    })}
                </Grid>
                {imgPreview.length < 11 ? (
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      accept="image/*"
                      name="images"
                      type="file"
                      hidden
                      onChange={(e) => {
                        handleFile(e);
                      }}
                    />
                  </Button>
                ) : (
                  <p>You can add maximum of 10 images</p>
                )}
              </Container>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleUpload(e)}
              >
                Add Product
              </Button>

              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            </Box>
          </Container>
        </Container>
      )}
    </Fragment>
  );
};
export default AddProduct;