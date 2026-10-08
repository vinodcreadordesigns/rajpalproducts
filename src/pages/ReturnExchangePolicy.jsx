import PolicyLayout from "./PolicyLayout";

const sections = [
  { heading: "Eligibility", points: [
    "Contact us within 48 hours of delivery for any return or exchange request.",
    "Products must be unused, sealed and in original packaging.",
  ]},
  { heading: "Damaged or Wrong Product", text: "If you receive a damaged or incorrect item, share an unboxing video/photos on WhatsApp +91 99306 70044 and we will arrange a replacement." },
  { heading: "Non-Returnable Items", points: [
    "Opened or used incense, dhoop and fragrance products (for hygiene reasons).",
    "Products damaged due to improper handling after delivery.",
  ]},
  { heading: "Exchange Process", points: [
    "Message us your order details and reason.",
    "Once approved, ship the product back to our Matunga address.",
    "Replacement is dispatched after we inspect the returned item.",
  ]},
  { heading: "Refunds", text: "Approved refunds are processed to the original payment method within 7 working days." },
  { heading: "Contact", text: "WhatsApp: +91 99306 70044 | Email: info@rajpalproducts.com" },
];

const ReturnExchangePolicy = () => (
  <PolicyLayout title="Return & Exchange Policy" updated="October 2026" sections={sections} />
);

export default ReturnExchangePolicy;