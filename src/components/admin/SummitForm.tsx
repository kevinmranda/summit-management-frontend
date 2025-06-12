import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

interface SummitFormProps {
  onSubmit: (data: { year: string; name: string; date: string }) => void;
}

const SummitForm = ({ onSubmit }: SummitFormProps) => {
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ year, name, date });
    setYear('');
    setName('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Summit</h2>
      <Input
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Button type="submit">Create</Button>
    </form>
  );
};

export default SummitForm;