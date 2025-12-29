export default function Breadcrumb({ items }) {
  if (!items.length) return null;

  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {item}
          {i < items.length - 1 && " → "}
        </span>
      ))}
    </div>
  );
}
