import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const RawDhoop = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "raw-dhoop")} />
export default RawDhoop;