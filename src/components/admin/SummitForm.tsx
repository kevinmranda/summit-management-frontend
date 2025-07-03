import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

interface SummitFormProps {
  onSubmit: (formData: FormData) => void;
}

const SummitForm = ({ onSubmit }: SummitFormProps) => {
  const [formData, setFormData] = useState({
    year: "",
    name: "",
    theme: "",
    date: "",
    start_date: "",
    end_date: "",
    venue: "",
    ministers: "",
    moderators: "",
    preachers: "",
    activities: "",
    schedule: "",
    clothing: "",
    description: "",
    price: "",
    max_capacity: "",
    contact_email: "",
    contact_phone: "",
  });

  const [posterImage, setPosterImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === "poster_image" && files && files[0]) {
      setPosterImage(files[0]);
    } else if (name === "gallery_images" && files) {
      setGalleryImages(files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value) submitData.append(key, value);
    });

    // Add files
    if (posterImage) {
      submitData.append("poster_image", posterImage);
    }

    if (galleryImages) {
      Array.from(galleryImages).forEach(file => {
        submitData.append("gallery_images", file);
      });
    }

    onSubmit(submitData);

    // Reset form
    setFormData({
      year: "", name: "", theme: "", date: "", start_date: "", end_date: "",
      venue: "", ministers: "", moderators: "", preachers: "", activities: "",
      schedule: "", clothing: "", description: "", price: "", max_capacity: "",
      contact_email: "", contact_phone: "",
    });
    setPosterImage(null);
    setGalleryImages(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto"
      encType="multipart/form-data"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 border-b pb-4">
        🏔️ Create Summit
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">📋 Basic Information</h3>

          <Input
            label="Year *"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
            placeholder="e.g., 2025"
          />

          <Input
            label="Summit Name *"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., TUCASA Annual Summit"
          />

          <Input
            label="Theme"
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
            placeholder="e.g., Walking in Faith"
          />

          <Input
            label="Display Date *"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            placeholder="e.g., December 15-17, 2025"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date *"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
            />

            <Input
              label="End Date *"
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleInputChange}
              required
            />
          </div>

          <Input
            label="Venue *"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            required
            placeholder="e.g., University of Dar es Salaam"
          />
        </div>

        {/* Leadership & Staff */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">👥 Leadership & Staff</h3>

          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Ministers</span>
              <textarea
                name="ministers"
                value={formData.ministers}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="e.g., Rev. John Smith, Pastor Mary Johnson"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Moderators</span>
              <textarea
                name="moderators"
                value={formData.moderators}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="e.g., Dr. Sarah Wilson, Prof. David Brown"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Preachers</span>
              <textarea
                name="preachers"
                value={formData.preachers}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="e.g., Bishop Michael Davis, Rev. Grace Lee"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">📅 Event Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Activities & Programs</span>
            <textarea
              name="activities"
              value={formData.activities}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="e.g., Opening Ceremony, Worship Sessions, Workshops, Youth Programs, Closing Ceremony"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Schedule</span>
            <textarea
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="e.g., Day 1: 9:00 AM - Registration, 10:00 AM - Opening, Day 2: 8:00 AM - Morning Prayer..."
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Clothing Guidelines</span>
          <textarea
            name="clothing"
            value={formData.clothing}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="e.g., Formal attire required, Business casual for workshops, Traditional wear welcome"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Detailed description of the summit, its purpose, and what attendees can expect..."
          />
        </label>
      </div>

      {/* Pricing & Contact */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">💰 Pricing & Capacity</h3>

          <Input
            label="Registration Price (TZS)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g., 50000"
          />

          <Input
            label="Maximum Capacity"
            name="max_capacity"
            type="number"
            value={formData.max_capacity}
            onChange={handleInputChange}
            placeholder="e.g., 500"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">📞 Contact Information</h3>

          <Input
            label="Contact Email"
            name="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={handleInputChange}
            placeholder="e.g., summit@tucasa.org"
          />

          <Input
            label="Contact Phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleInputChange}
            placeholder="e.g., +255 123 456 789"
          />
        </div>
      </div>

      {/* Media Upload */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">🖼️ Media & Images</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Summit Poster</span>
            <input
              type="file"
              name="poster_image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">Upload the main summit poster (JPG, PNG, GIF, WEBP)</p>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Gallery Images</span>
            <input
              type="file"
              name="gallery_images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">Upload multiple images for the summit gallery</p>
          </label>
        </div>

        {posterImage && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              ✅ Poster selected: {posterImage.name}
            </p>
          </div>
        )}

        {galleryImages && galleryImages.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              ✅ Gallery images selected: {galleryImages.length} file(s)
            </p>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full mt-8 py-3 text-lg">
        🚀 Create Summit
      </Button>
    </form>
  );
};

export default SummitForm;
