interface Payment {
  id: number;
  user_id: number;
  amount: number;
  date: string;
}

interface ReportViewerProps {
  payments: Payment[];
}

const ReportViewer = ({ payments }: ReportViewerProps) => (
  <div className="bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">Payment Report</h2>
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">User ID</th>
          <th className="p-2 border">Amount</th>
          <th className="p-2 border">Date</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td className="p-2 border">{payment.id}</td>
            <td className="p-2 border">{payment.user_id}</td>
            <td className="p-2 border">{payment.amount}</td>
            <td className="p-2 border">{payment.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ReportViewer;