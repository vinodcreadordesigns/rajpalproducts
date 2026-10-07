import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const IncenseSticksPage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "incense-sticks")} />;

export default IncenseSticksPage;
