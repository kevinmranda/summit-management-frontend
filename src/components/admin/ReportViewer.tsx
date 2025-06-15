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
  <div className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold mb-4 border-b pb-2">📊 Payment Report</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-sm uppercase text-gray-600">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Amount (TZS)</th>
            <th className="px-4 py-2 border">Date</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-4 py-2 border">{payment.id}</td>
              <td className="px-4 py-2 border">{payment.user_id}</td>
              <td className="px-4 py-2 border">
                {payment.amount.toLocaleString()} TZS
              </td>
              <td className="px-4 py-2 border">
                {new Date(payment.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ReportViewer;
