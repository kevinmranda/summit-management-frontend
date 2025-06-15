import type { Summit as SummitType } from '../../types/User';

interface SummitDetailsProps {
  summit: SummitType;
}

// interface SummitDetailsProps {
//   summit: Summit;
// }

const SummitDetails = ({ summit }: SummitDetailsProps) => (
  <div className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold mb-4 border-b pb-2">
      🏔️ {summit.name}{" "}
      <span className="text-base font-medium">({summit.year})</span>
    </h2>
    <div className="space-y-2 text-base">
      <p>
        <span className="font-semibold">📅 Date:</span> {summit.date}
      </p>
      <p>
        <span className="font-semibold">📍 Venue:</span> {summit.venue}
      </p>
      {summit.ministers && (
        <p>
          <span className="font-semibold">🙏 Ministers:</span>{" "}
          {summit.ministers}
        </p>
      )}
      {summit.clothing && (
        <p>
          <span className="font-semibold">👗 Clothing:</span> {summit.clothing}
        </p>
      )}
      {summit.description && (
        <p>
          <span className="font-semibold">📝 Description:</span>{" "}
          {summit.description}
        </p>
      )}
    </div>
  </div>
);

export default SummitDetails;

