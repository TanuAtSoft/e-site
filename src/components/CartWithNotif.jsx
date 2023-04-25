import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const CartWithNotif =()=>{
    const navigate = useNavigate()
    const count = JSON.parse(localStorage.getItem("cart"))
    const handleCartClick=()=>{
        navigate("/cart")
    }
    return(
        <Fragment>
        {count && count >0 &&<div className='cart-container' current-count={count} onClick={handleCartClick}>
            <ShoppingCartIcon/>
        </div>}
        {(!count || count ===0) && <ShoppingCartIcon onClick={handleCartClick}/> }
        </Fragment>
    )
}
export default CartWithNotif;