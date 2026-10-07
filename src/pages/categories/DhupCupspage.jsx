import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const DhupCupspage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "Dhup-cups")} />;

export default DhupCupspage;
