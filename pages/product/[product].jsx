import { useRouter } from "next/router";
import SingleProduct from "../../components/SingleProduct";
import styles from "../../styles/ShopPage.module.css";
import { getProductById } from "../api/product/[product]";
const ProductPage = ({ item, coins }) => {
  const router = useRouter();
  return (
    <div>
      {item.map((product) => (
        <SingleProduct coins={coins} key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps(ctx) {
  const id = ctx.query.product;
  let response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
  );
  const coins = await response.json();
  const item = await getProductById(parseInt(id));
  return { props: { item, coins } };
}
