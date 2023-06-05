import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartWithNotif =()=>{
    const navigate = useNavigate()
    const [count, setCount] = useState()
    
    useEffect(()=>{
        const initialCount = JSON.parse(localStorage.getItem("cart"))
        setCount(initialCount)
    },[])

    const handleCartClick=()=>{
        navigate("/cart")
    }
    return(
        <Fragment>
        {count && count > 0 &&<div className='cart-container' current-count={count} onClick={handleCartClick}>
            <ShoppingCartIcon/>
        </div>}
        {(!count || count === 0) && <ShoppingCartIcon onClick={handleCartClick}/> }
        </Fragment>
    )
}
export default CartWithNotif;