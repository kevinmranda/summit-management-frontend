import type { Summit as SummitType } from '../../types/User';

interface SummitDetailsProps {
  summit: SummitType;
}

// interface SummitDetailsProps {
//   summit: Summit;
// }

const SummitDetails = ({ summit }: SummitDetailsProps) => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  // Parse gallery images if available
  let galleryImages: string[] = [];
  if (summit.gallery_images) {
    try {
      galleryImages = JSON.parse(summit.gallery_images);
    } catch (e) {
      console.warn('Failed to parse gallery images:', e);
    }
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 text-secondary-900 p-8 rounded-2xl shadow-soft max-w-5xl mx-auto border border-secondary-200">
      {/* Header with Poster */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">
            🏔️ {summit.name}
            <span className="block text-2xl font-medium text-primary-600 mt-2">
              {summit.theme && `"${summit.theme}"`}
            </span>
            <span className="block text-lg font-medium text-primary-600 mt-1">
              ({summit.year})
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary-600">📅 Date:</span>
              <span className="text-secondary-800 font-medium">{summit.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary-600">📍 Venue:</span>
              <span className="text-secondary-800 font-medium">{summit.venue}</span>
            </div>
            {summit.price > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary-600">💰 Price:</span>
                <span className="text-secondary-800 font-medium">TZS {summit.price.toLocaleString()}</span>
              </div>
            )}
            {summit.max_capacity > 0 && (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary-600">👥 Capacity:</span>
                <span className="text-secondary-800 font-medium">{summit.max_capacity} attendees</span>
              </div>
            )}
          </div>
        </div>

        {/* Summit Poster */}
        {summit.poster_image && (
          <div className="lg:w-80">
            <img
              src={`${baseURL}/uploads/${summit.poster_image}`}
              alt={`${summit.name} Poster`}
              className="w-full h-auto rounded-xl shadow-lg border border-secondary-200"
            />
          </div>
        )}
      </div>

      {/* Leadership Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summit.ministers && (
          <div className="bg-white p-6 rounded-xl border border-secondary-200">
            <h3 className="text-lg font-bold text-secondary-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🙏</span>
              Ministers
            </h3>
            <p className="text-secondary-700 leading-relaxed">{summit.ministers}</p>
          </div>
        )}

        {summit.moderators && (
          <div className="bg-white p-6 rounded-xl border border-secondary-200">
            <h3 className="text-lg font-bold text-secondary-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">👨‍💼</span>
              Moderators
            </h3>
            <p className="text-secondary-700 leading-relaxed">{summit.moderators}</p>
          </div>
        )}

        {summit.preachers && (
          <div className="bg-white p-6 rounded-xl border border-secondary-200">
            <h3 className="text-lg font-bold text-secondary-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">📖</span>
              Preachers
            </h3>
            <p className="text-secondary-700 leading-relaxed">{summit.preachers}</p>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {summit.activities && (
          <div className="bg-white p-6 rounded-xl border border-secondary-200">
            <h3 className="text-lg font-bold text-secondary-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Activities & Programs
            </h3>
            <p className="text-secondary-700 leading-relaxed whitespace-pre-line">{summit.activities}</p>
          </div>
        )}

        {summit.schedule && (
          <div className="bg-white p-6 rounded-xl border border-secondary-200">
            <h3 className="text-lg font-bold text-secondary-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">⏰</span>
              Schedule
            </h3>
            <p className="text-secondary-700 leading-relaxed whitespace-pre-line">{summit.schedule}</p>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {summit.clothing && (
          <div className="bg-white p-6 rounded-xl border border-secondary-200">
            <h3 className="text-lg font-bold text-secondary-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">👗</span>
              Clothing Guidelines
            </h3>
            <p className="text-secondary-700 leading-relaxed">{summit.clothing}</p>
          </div>
        )}

        {(summit.contact_email || summit.contact_phone) && (
          <div className="bg-white p-6 rounded-xl border border-secondary-200">
            <h3 className="text-lg font-bold text-secondary-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">📞</span>
              Contact Information
            </h3>
            <div className="space-y-2">
              {summit.contact_email && (
                <p className="text-secondary-700">
                  <span className="font-medium">Email:</span> {summit.contact_email}
                </p>
              )}
              {summit.contact_phone && (
                <p className="text-secondary-700">
                  <span className="font-medium">Phone:</span> {summit.contact_phone}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {summit.description && (
        <div className="bg-white p-6 rounded-xl border border-secondary-200 mb-8">
          <h3 className="text-lg font-bold text-secondary-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            About This Summit
          </h3>
          <p className="text-secondary-700 leading-relaxed whitespace-pre-line">{summit.description}</p>
        </div>
      )}

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-secondary-200">
          <h3 className="text-lg font-bold text-secondary-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🖼️</span>
            Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((imagePath, index) => (
              <img
                key={index}
                src={`${baseURL}/uploads/${imagePath}`}
                alt={`Summit Gallery ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-secondary-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => window.open(`${baseURL}/uploads/${imagePath}`, '_blank')}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SummitDetails;

