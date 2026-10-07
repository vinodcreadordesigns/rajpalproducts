import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const DhoopSticksPage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "dhoop-sticks")} />;

export default DhoopSticksPage;
