import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddHabitFormProps {
  onAdd: (name: string) => void;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAdd }) => {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAdd(habitName.trim());
      setHabitName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Enter a new habit..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={50}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          Add
        </button>
      </div>
    </form>
  );
};

export default AddHabitForm;