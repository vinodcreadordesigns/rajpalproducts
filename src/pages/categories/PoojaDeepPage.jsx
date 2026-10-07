import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const PoojaDeepPage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "pooja-deep")} />;

export default PoojaDeepPage;
