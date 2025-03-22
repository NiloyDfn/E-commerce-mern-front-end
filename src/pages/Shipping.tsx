import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/store";
import { cartReducerInitialState } from "../types/reducer-types";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shiping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, total } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );

  const [shippingInfo, setshippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo))
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      toast.error("somthing wen't wrong")
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setshippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")} key="back-btn">
        <BiArrowBack />
      </button>

      <form onSubmit={submitHandler} key="shipping-form">
        <h1>Shipping Info...</h1>
        <input
          required
          type="text"
          placeholder="address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
          key="address-input"
        />

        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
          key="city-input"
        />

        <input
          required
          type="text"
          placeholder="state"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
          key="state-input"
        />

        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
          key="country-select"
        >
          <option value="">Select your Country</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="America">America</option>
          <option value="uk">United Kingdom</option>
        </select>

        <input
          required
          type="number"
          placeholder="pincode"
          name="pincode"
          value={shippingInfo.pincode}
          onChange={changeHandler}
          key="pincode-input"
        />

        <button type="submit" key="pay-now-btn">Pay Now</button>
      </form>
    </div>
  );
};

export default Shiping;
