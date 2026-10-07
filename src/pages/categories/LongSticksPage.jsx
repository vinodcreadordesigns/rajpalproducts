import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const LongSticksPage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "long-sticks")} />;

export default LongSticksPage;
