import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const KhadiSoapsPage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "khadi-soaps")} />;

export default KhadiSoapsPage;
