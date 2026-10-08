import PolicyLayout from "./PolicyLayout";

const sections = [
  { heading: "Information We Collect", points: [
    "Name, phone number, email and delivery address when you place an order or contact us.",
    "Basic usage data such as pages visited, to improve our website.",
  ]},
  { heading: "How We Use It", points: [
    "To process and deliver your orders.",
    "To reply to your queries on WhatsApp, phone or email.",
    "To improve our products and website experience.",
  ]},
  { heading: "Sharing of Information", text: "We do not sell your personal information. It is shared only with delivery and payment partners as needed to complete your order, or when required by law." },
  { heading: "Data Security", text: "We take reasonable steps to protect your information. However, no online method is completely secure." },
  { heading: "Your Rights", text: "You can ask us to update or delete your personal information at any time by contacting us at info@rajpalproducts.com." },
  { heading: "Contact", text: "Rajpal Products, Shop No.2, Vastu Matunga Co-operative Housing Society, Laxmi Narayan Lane, Matunga C.Rly, Mumbai 400-019. WhatsApp: +91 99306 70044." },
];

const PrivacyPolicy = () => (
  <PolicyLayout title="Privacy Policy" updated="October 2026" sections={sections} />
);

export default PrivacyPolicy;