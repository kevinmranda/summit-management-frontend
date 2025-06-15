import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

interface SummitFormProps {
  onSubmit: (data: {
    year: string;
    name: string;
    date: string;
    venue: string;
    ministers?: string;
    clothing?: string;
    description?: string;
  }) => void;
}

const SummitForm = ({ onSubmit }: SummitFormProps) => {
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [ministers, setMinisters] = useState("");
  const [clothing, setClothing] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ year, name, date, venue, ministers, clothing, description });
    setYear("");
    setName("");
    setDate("");
    setVenue("");
    setMinisters("");
    setClothing("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-400 p-6 rounded-2xl shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Create Summit</h2>

      <Input
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        className="mb-4"
      />
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mb-4"
      />
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="mb-4"
      />
      <Input
        label="Venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        required
        className="mb-4"
      />
      <Input
        label="Ministers"
        value={ministers}
        onChange={(e) => setMinisters(e.target.value)}
        className="mb-4"
      />
      <Input
        label="Clothing"
        value={clothing}
        onChange={(e) => setClothing(e.target.value)}
        className="mb-4"
      />
      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-6"
      />

      <Button type="submit" className="w-full">
        Create
      </Button>
    </form>
  );
};

export default SummitForm;
