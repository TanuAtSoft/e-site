import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "75vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{lineHeight:"0.8px",  display: "flex",flexDirection:"column",alignItems: "center",
        justifyContent: "center",}}>
        <h1 style={{fontSize:"40px"}}>404</h1>
        <p>Page not found</p>
        <p>Go back to <Link to="/">home </Link></p>
      </div>
    </div>
  );
};
export default PageNotFound;
