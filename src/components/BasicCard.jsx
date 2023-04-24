import React, { Component }  from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const BasicCard = () => {
  const [count,setCount ] = React.useState(1);
  const Quantity=[1,2,3,4,5,6,7,8,9,10,11,12]

  const handleChange = (event) => {
    setCount(event.target.value);
  };
  return (
    <Card sx={{ minWidth: 275,height:"80vh" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <CheckCircleIcon style={{ fontSize: 17 }} /> One time Purchase
        </Typography>
        <Typography sx={{ mb: 1.5,mt: 1.5 }} color="text.secondary">
          <LocationOnIcon /> select delivery location
        </Typography>
        <Typography variant="h5"  sx={{ mt: 1.5 }}>
          In stock
        </Typography>

        <Typography variant="body2">
          sold by
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Typography sx={{ mb: 1.5,mt: 1.5 }} component="div">
          Quantity:
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={count}
            label="count"
            onChange={handleChange}
            sx={{height:"23px"}}
          >
            {Quantity.map((item,id)=>{
              return(
                <MenuItem value={item}  key={id}>{item}</MenuItem>
              )
            })}
          </Select>
        </Typography>
     
      </CardContent>
      <CardActions sx={{flexDirection:"column", justifyContent:"center",gap:"30px"}}>
      <Button  variant="contained" sx={{width:"100% !important"}}>
         Add to Cart
        </Button>
        <Button variant="contained" sx={{width:"100% !important"}}>
         Buy now
        </Button>
        <Button variant="outlined" sx={{width:"100% !important"}}>
         Add to  wishlist
        </Button>

      </CardActions>
    </Card>
  );
};
export default BasicCard;
