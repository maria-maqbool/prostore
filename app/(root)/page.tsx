import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  console.log("sampleData: ", latestProducts);
  
  return ( 
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" 
      limit={4}
      />
    </>
   );
}
 
export default Homepage;