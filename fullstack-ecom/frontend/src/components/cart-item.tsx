import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItemProps = {
    cartItem: any;
}

const CartItem = ({cartItem}:CartItemProps) => {
    const {photoUrl, productId, name, quantity, stock, price} = cartItem
  return (
    <div className="cart-item">
    <img src={photoUrl} alt={name}/>
    <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
    </article>
    <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
    </div>

    <button>
        <FaTrash/>
    </button>
    </div>
  )
}

export default CartItem