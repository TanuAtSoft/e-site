import { Container } from "@mui/material";
import moment from "moment";
import { Fragment } from "react";

const DisplayOrders = ({ order }) => {
  console.log("order", order);
  //console.log("moment", moment(order.createdAt).format("DD-MM-YYYY"))
  return (
    <Fragment>
      <Container maxWidth="lg">
        <div>
          <h4>Order Id</h4> <span>{order.orderId}</span>
        </div>
        <div>
          <h4>Ordered On</h4>{" "}
          <span>{moment(order?.createdAt).format("DD-MM-YYYY")}</span>
        </div>
        <div>
          {order?.orderedItems.length > 0 &&
            order?.orderedItems.map((item, id) => {
              return (
                <div key={id}>
                  <img
                    style={{ height: "150px", width: "auto" }}
                    src={`${item.image}`}
                    alt="product"
                    onClick={()=>{}}
                  />
                  <div>
                    <h4>status: {item.status}</h4>
                    {item.shippingDetails && item.shippingDetails !== "" && item.shippingDetails !== undefined &&(
                      <h4>Shipping Details {item.shippingDetails? item.shippingDetails : ""}</h4>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
      <br />
    </Fragment>
  );
};
export default DisplayOrders;
