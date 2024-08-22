import './OrderRow.css';

export const OrderRow = ({ order }) => {
  const { id, date, totalPrice, qtyProducts, status } = order;

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <tr>
      <td>#{id}</td>
      <td>{formattedDate}</td>
      <td>
        ${totalPrice.toFixed(2)} ({qtyProducts} products)
      </td>
      <td>{status}</td>
      <td className="details">View Details</td>
    </tr>
  );
};
