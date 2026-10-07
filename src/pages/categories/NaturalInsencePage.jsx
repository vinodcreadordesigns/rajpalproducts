import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const NaturalInsencePage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "natural-incense")} />;

export default NaturalInsencePage;
