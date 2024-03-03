import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";

type ProductsProp = {
  productId: string;
  photoUrl: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};

const ProductCard = ({
  productId,
  price,
  name,
  photoUrl,
  stock,
  handler,
}: ProductsProp) => {
  return (
    <div className="product-card">
      <img src={`${server}/${photoUrl}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button onClick={() => handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
