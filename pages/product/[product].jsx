import { useRouter } from "next/router";
import SingleProduct from "../../components/SingleProduct";
import styles from "../../styles/ShopPage.module.css";
import { getProductById } from "../api/product/[product]";
const ProductPage = ({ item }) => {
  const router = useRouter();
  return (
    <div>
      {item.map((product) => (
        <SingleProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps(ctx) {
  const id = ctx.query.product;
  // console.log(category)
  // console.log(id)
  const item = await getProductById(parseInt(id));
  return { props: { item } };
}
