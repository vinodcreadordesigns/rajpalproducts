import PolicyLayout from "./PolicyLayout";

const sections = [
  { heading: "Introduction", text: "At Rajpal Products, we take pride in delivering quality products and ensuring a smooth shopping experience for our customers. Every order is carefully packed and checked before dispatch. Please read our Return & Exchange Policy before placing your order." },

  { heading: "1. Eligibility for Return / Exchange", points: [
    "The product received is damaged during transit.",
    "The product received is defective or has a manufacturing issue.",
    "The product received is incorrect or different from the product ordered.",
    "Any product or item is missing from the order.",
    "The product received is materially different from the description or specifications displayed on our website.",
    "For eligible cases, Rajpal Products may provide a replacement, exchange or refund, depending on the nature of the issue and availability of the product.",
  ]},

  { heading: "2. Time Limit", points: [
    "Return or exchange requests must be raised within 7 days of delivery of the order.",
    "Requests received after 7 days may not be accepted, except where the issue relates to a manufacturing defect or another matter covered by applicable law.",
  ]},

  { heading: "3. Products That Cannot Be Returned", points: [
    "For hygiene, safety and quality reasons, the following are not eligible for return or exchange once opened, used, unsealed or tampered with, unless the product is defective, damaged, incorrect or otherwise covered under applicable consumer law:",
    "Incense Sticks, Dhoop Sticks and Dhoop Cups",
    "Attar / Perfumes / Roll-ons and Fragrance Oils",
    "Camphor and fragrance products",
    "Soaps and personal-use products",
    "Pooja products and Candles",
    "Car fragrance products, Diffusers and fragrance products",
    "Any other product that has been opened, used or unsealed",
    "Returned products must be in their original condition, unused and with original packaging, labels and accessories, wherever applicable.",
  ]},

  { heading: "4. Unboxing Video", points: [
    "For damaged, incorrect or missing items, customers are strongly encouraged to record a continuous unboxing video from the time the package is received until the contents are fully checked.",
    "The video should clearly show the condition of the outer package.",
    "The video should clearly show the shipping label / order details.",
    "The video should clearly show the complete package being opened.",
    "The video should clearly show the product and any damage or discrepancy.",
    "An unboxing video may help us investigate and resolve transit-related claims faster.",
  ]},

  { heading: "5. How to Raise a Return / Exchange Request", points: [
    "Contact our customer support within 7 days of delivery.",
    "Please provide: Order Number, Customer Name and Registered Mobile Number.",
    "Please provide: Reason for return/exchange.",
    "Please provide: Clear photographs of the product and packaging.",
    "Please provide: Unboxing video, where applicable.",
    "Our team will review the request and confirm whether the product qualifies for return or exchange.",
  ]},

  { heading: "6. Return Pickup", points: [
    "Where a return is approved due to a wrong, defective or damaged product, Rajpal Products will arrange the return process as applicable.",
    "For any return arising from reasons other than a product defect, damage, incorrect item or an issue attributable to Rajpal Products, return shipping charges may be applicable.",
  ]},

  { heading: "7. Refunds", points: [
    "Once the returned product is received and inspected, we will process the applicable refund.",
    "Refunds will generally be made to the original payment method, wherever technically possible.",
    "The time taken for the amount to reflect in your account may depend on your bank, card issuer, UPI provider or payment gateway.",
    "Any shipping or other charges that are non-refundable, where applicable, will be communicated to you before processing the refund.",
  ]},

  { heading: "8. Exchange", points: [
    "An exchange will be subject to product availability.",
    "If the requested replacement product is unavailable, you may be offered an alternative product of equivalent value or an applicable refund, as mutually agreed.",
  ]},

  { heading: "9. Incorrect Address / Failed Delivery", points: [
    "Customers are responsible for providing a complete and accurate delivery address and contact details.",
    "If an order is returned to us due to an incorrect address, incomplete address, repeated delivery failure or non-availability of the recipient, additional shipping charges may apply for re-dispatch.",
  ]},

  { heading: "10. Promotional / Discounted Orders", points: [
    "Products purchased using promotional offers, coupons or special discounts may be subject to specific terms mentioned with the respective offer.",
    "Any refund or exchange will be calculated based on the actual amount paid for the eligible product/order, subject to the applicable terms.",
  ]},

  { heading: "11. Cancellation", points: [
    "If you wish to cancel an order, please contact us as soon as possible.",
    "Orders that have already been packed or dispatched may not be eligible for cancellation and may be handled under our applicable return/refund process.",
  ]},

  { heading: "12. Our Commitment", text: "We believe in quality, transparency and customer satisfaction. If you receive a product that is damaged, defective, incorrect or otherwise does not match your order, please contact us and our team will make reasonable efforts to resolve the issue promptly. Nothing in this policy is intended to limit any rights or remedies available to customers under applicable consumer protection laws." },

  { heading: "Customer Support", text: "Rajpal Products, Shop No. 2, Vastu Matunga Co-operative Housing Society, Laxmi Narayan Lane, Matunga C. Railway, Mumbai – 400 019. Email: rajpalproduct@gmail.com | Website: www.rajpalproducts.in | WhatsApp: +91 99306 70044" },
];

const ReturnExchangePolicy = () => (
  <PolicyLayout
    title="Return & Exchange Policy"
    updated="8 October 2026"
    sections={sections}
  />
);

export default ReturnExchangePolicy;