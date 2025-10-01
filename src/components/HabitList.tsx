import React from 'react';
import HabitCard from './HabitCard';
import { Habit } from '../types';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string, date: string) => void;
  onDelete: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onToggle, onDelete }) => {
  if (habits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">No habits yet. Add your first habit to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <HabitCard 
          key={habit.id} 
          habit={habit} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default HabitList;