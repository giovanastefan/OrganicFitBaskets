import './OrderRow.css';

export const OrderRow = ({ order }) => {
  const { id, date, total, items, status } = order;

  const qtyProducts = items.reduce((sum, item) => sum + item.quantity, 0)
  const orderDate = date instanceof Date ? date: new Date(date);

  const formattedDate = orderDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedTotalPrice = total 
  ? Number(total).toFixed(2) 
  : "0.00";

  return (
    <tr>
      <td>#{id}</td>
      <td>{formattedDate}</td>
      <td>
        ${formattedTotalPrice} ({qtyProducts} products)
      </td>
      <td>{status}</td>
      <td className="details">View Details</td>
    </tr>
  );
};
