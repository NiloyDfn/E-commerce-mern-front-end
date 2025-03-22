import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApI";
import toast from "react-hot-toast";
import  { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch()
  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock < 1) return toast.error("out of stock");

    dispatch(addToCart(cartItem))

    toast.success(
      <div>
        <Link to="/cart">Added to you cart 🛒</Link>
      </div>, 
      {
        style: {
          background: 'white',
          color: 'black', 
          fontSize: '1.2rem',
          padding: '1rem'
        },
        duration: 4000,
        icon: '👨🏼‍💻'
      }
    )

  };

  if (isError) toast.error("cannot fetch the products for server problem");

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
