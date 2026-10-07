const TestimonialCard = ({ item }) => (
  <article className="glass-card rounded-2xl p-6">
    <p className="text-beige/85">"{item.quote}"</p>
    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">{item.name}</p>
  </article>
);

export default TestimonialCard;
