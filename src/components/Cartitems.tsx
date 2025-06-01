import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem : CartItem;
  increment :(CartItem:CartItem) => void;
  decrement : (CartItem:CartItem) => void;
  removeHandler : (id:string) => void;
};

const Cartitems = ({cartItem,increment,decrement,removeHandler}:CartItemProps) => {

  const {photo , productId , name, price , quantity } = cartItem
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>{price} tk</span>
      </article>
      <div>
        <button onClick={()=> decrement(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => increment(cartItem)}>+</button>
      </div>
      <button onClick={()=> removeHandler(productId)}>
        <FaTrash/>
      </button>
    </div>
  )
}

export default Cartitems