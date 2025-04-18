import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApI";
import toast from "react-hot-toast";
import { CustomeError } from "../types/api-types";
import { Skeleton } from "../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const {
    data: categorieResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(200000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading : productLoading, data : searchedData, isError : productIsError, error : productError } = useSearchProductsQuery({search, sort , category , page , price : maxPrice});

  const addToCartHandler = (cartItem: CartItem) => {
    if(cartItem.stock < 1) return toast.error("out of stock");
    dispatch(addToCart(cartItem));
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

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as CustomeError;
    toast.error(err.data.message);
  }

  
  if (productIsError) {
    const err = productError as CustomeError;
    toast.error(err.data.message);
  }

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="acs">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max price : {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={200000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!loadingCategories &&
              categorieResponse?.categories.map((i) => (
                <option key={i} value={i}>{i.toUpperCase()}</option>
              ))}
          </select>
        </div> 
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
       { productLoading ? <Skeleton length={10}/> :  <div className="search-product-list">
              {
                searchedData?.products.map((i)=> (
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
              }
        </div>}

       {searchedData && searchedData.totalPage > 1 && (
        <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            prev
          </button>
          <span>
            {page} of {searchedData.totalPage}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </article>
      )}
      </main>
    </div>
  );
};

export default Search;
