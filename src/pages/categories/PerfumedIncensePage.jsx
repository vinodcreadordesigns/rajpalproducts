import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const PerfumedIncensePage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "perfumed-incense")} />;

export default PerfumedIncensePage;
