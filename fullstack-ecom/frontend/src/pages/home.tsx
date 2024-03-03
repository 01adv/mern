import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const addtoCartHandler = () => {};

  if (isError) toast.error("Cannot fetch the products");

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
          <>
          <Skeleton width="80vw"/>
          <Skeleton width="80vw"/>
          </>
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              photoUrl={i.photo}
              handler={addtoCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
