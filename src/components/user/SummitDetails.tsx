interface Summit {
  id: number;
  year: string;
  name: string;
  date: string;
  location?: string;
}

interface SummitDetailsProps {
  summit: Summit;
}

const SummitDetails = ({ summit }: SummitDetailsProps) => (
  <div className="bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">{summit.name} ({summit.year})</h2>
    <p><strong>Date:</strong> {summit.date}</p>
    {summit.location && <p><strong>Location:</strong> {summit.location}</p>}
  </div>
);

export default SummitDetails;