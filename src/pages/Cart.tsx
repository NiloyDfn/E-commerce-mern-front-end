import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import Cartitemscard from "../Components/Cartitems";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
    );

  const dispatch = useDispatch();

  const [couponCode, setcouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const increment = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock)
      return toast.success("no more item available in stock!");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrement = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(applyDiscount(res.data.discount));
          dispatch(calculatePrice());

          setIsValidCouponCode(true);
        })
        .catch(() => {
          dispatch(applyDiscount(0));
          dispatch(calculatePrice());

          setIsValidCouponCode(false);
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);
  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <Cartitemscard
              increment={increment}
              decrement={decrement}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No items added </h1>
        )}
      </main>
      <aside>
        <p>subTotal : {subtotal} tk </p>
        <p>shiping Carges : {shippingCharges} tk </p>
        <p>Tax : {tax} tk</p>
        <p>
          Discount : <em>- {discount} tk</em>
        </p>
        <p>
          <b>Total : {total} tk</b>
        </p>
        <input
          type="text"
          placeholder="Add Your Coupon code"
          value={couponCode}
          onChange={(e) => setcouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              {discount}of using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              {" "}
              <BiSolidError /> Invalid couponCode{" "}
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
