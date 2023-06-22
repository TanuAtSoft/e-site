import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { uploadImgs } from "../../apis/upload/uploadImgs";
import { addProduct } from "../../apis/products/addProduct";
import Loader from "../../components/Loader";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMediaQuery } from "react-responsive";
import {
  getMainCategories,
  getSubCategories,
} from "../../apis/categories/getCategoris";

const AddProduct = () => {
  const [desc, setDesc] = useState([""]);
  let token = JSON.parse(localStorage.getItem("token"));
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [mainCat, setMainCat] = useState([]);
  const [subCat, setSubCat] = useState([]);

  const initialState = {
    title: "",
    name:"",
    description: [""],
    main_category: "",
    sub_category: "",
    disount: 0,
    brand: "",
    price: 1,
    stock: 1,
  };

  const [product, setProduct] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [loading, setLoading] = useState();
  const [refresh, setRefresh] = useState();

  const handleDeleteImages = (id) => {
    imgPreview.splice(id, 1);
    setRefresh(!refresh);
  };
  useEffect(() => {
    setImgPreview(imgPreview);
  }, [refresh]);

  const handleCatChange = (e) => {
    const value = e.target.value;
    product["main_category"] = value;
    setProduct({ ...product });
  };
  const handleSubCatChange = (e) => {
    const value = e.target.value;
    product["sub_category"] = value;
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
    if (imgPreview.length < 7) {
      setImgPreview([...imgPreview, tempUrl]);
    }
  };

  useEffect(() => {
    const fetchCat = async () => {
      const mainCatres = await getMainCategories();
      const subCatres = await getSubCategories();
      if (mainCatres.data.statusCode === 200) {
        setMainCat(mainCatres.data.data.mainCategories);
      }
      if (subCatres.data.statusCode === 200) {
        setSubCat(subCatres.data.data.subCategories);
      }
    };
    fetchCat();
  }, []);

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
      product.main_category !== "" &&
      product.brand !== "" &&
      product.price &&
      product.price > 0 &&
      product.stock > 1 &&
      imgPreview.length >= 2 &&
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
                autoFocus
                margin="normal"
                required
                fullWidth
                id="title"
                label="Product Name"
                value={product.title}
                name="title"
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                //   helperText={
                //     errorFields.includes("email") ? "Incorrect entry." : ""
                //   }
              />
              <TextField
                //error={errorFields.includes("email") ? true : false}
                autoFocus
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product Generic Name e.g shirt,blazer,shoe etc"
                value={product.name}
                name="name"
                autoComplete="off"
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
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: isTabletOrMobile ? "column" : "row",
                }}
              >
                <Container>
                  {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
                  <TextField
                    style={{ width: "100%" }}
                    variant="outlined"
                    value={product.main_category}
                    onChange={handleCatChange}
                    select
                    label="main category"
                  >
                    {mainCat.length > 0 &&
                      mainCat.map((item, id) => {
                        return (
                          <MenuItem key={id} value={item.mainCategory}>
                            {item.mainCategory}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </Container>
                <br />
                <Container>
                  {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
                  <TextField
                    style={{ width: "100%" }}
                    variant="outlined"
                    value={product.sub_category}
                    onChange={handleSubCatChange}
                    select
                    label="sub-category"
                  >
                    {subCat.length > 0 &&
                      subCat.map((item, id) => {
                        return (
                          <MenuItem key={id} value={item.subCategory}>
                            {item.subCategory}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                </Container>
                <Container>
                  <TextField
                    value={product.price}
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    //error={errorFields.includes("email") ? true : false}
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Product Price"
                    name="price"
                    autoComplete="off"
                    inputProps={{ maxLength: 10 }}
                    onChange={onChangeHandler}
                    //   helperText={
                    //     errorFields.includes("email") ? "Incorrect entry." : ""
                    //   }
                  />
                </Container>
                <Container>
                  <TextField
                    value={product.discount}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    //error={errorFields.includes("email") ? true : false}
                    margin="normal"
                    required
                    fullWidth
                    id="discount"
                    label="Discount in %"
                    name="discount"
                    autoComplete="off"
                    inputProps={{ maxLength: 10 }}
                    onChange={onChangeHandler}
                    //   helperText={
                    //     errorFields.includes("email") ? "Incorrect entry." : ""
                    //   }
                  />
                </Container>
                <Container>
                  <TextField
                    type="number"
                    value={product.stock}
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    //error={errorFields.includes("email") ? true : false}
                    margin="normal"
                    required
                    fullWidth
                    id="stock"
                    label="stock available"
                    name="stock"
                    autoComplete="off"
                    //inputProps={{ maxLength: 10 }}
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
                          <CancelIcon
                            style={{
                              position: "absolute",
                              left: isTabletOrMobile ? "66%" : "95%",
                              top: "19px",
                            }}
                            onClick={() => {
                              handleDeleteImages(id);
                            }}
                          />
                        </Grid>
                      );
                    })}
                </Grid>
                {imgPreview.length < 7 ? (
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
                  <p>You can add maximum of 6 images</p>
                )}
                {imgPreview.length < 2 && (
                  <p>Kindly add more than two images</p>
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
