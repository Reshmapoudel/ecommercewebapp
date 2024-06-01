import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({ featuredProducts, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProducts} />
      <NewProducts products={newProducts} />
    </div>
  );
}
export async function getServerSideProps() {
  const featuredProductId = "66532307b6fae03947c8fb74";
  await mongooseConnect();
  // const featuredProducts = "";
  const featuredProducts = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
