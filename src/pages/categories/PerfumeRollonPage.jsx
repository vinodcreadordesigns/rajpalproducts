import CategoryPageTemplate from "../../templates/CategoryPageTemplate";
import { categories } from "../../data/siteData";

const PerfumeRollonPage = () => <CategoryPageTemplate category={categories.find((c) => c.slug === "perfume-rollon")} />;

export default PerfumeRollonPage;
