import { FaPlus } from "react-icons/fa";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";
import { useSelector } from "react-redux";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined
};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);

  const existingItem = cartItems.find(item => item.productId === productId);
  
  return (
    <div className="productcard">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p> 
      <span>price : {price} Tk</span>
      <span>stock : {stock} </span>

      <div>
        <button onClick={()=> {
          handler({
            productId,
            price,
            name,
            photo,
            stock,
            quantity: existingItem ? existingItem.quantity + 1 : 1,
          });
        }}>
          <FaPlus  />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
