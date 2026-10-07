import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const AirFreshenersPage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "air-fresheners")} />;

export default AirFreshenersPage;