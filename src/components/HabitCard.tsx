import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string, date: string) => void;
  onDelete: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete }) => {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const days = getLast7Days();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{habit.name}</h3>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete habit"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex gap-2">
        {days.map(date => {
          const isCompleted = habit.completedDates.includes(date);
          const isToday = date === today;
          
          return (
            <button
              key={date}
              onClick={() => onToggle(habit.id, date)}
              className={`flex-1 aspect-square rounded-lg border-2 transition-all ${
                isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : isToday
                  ? 'border-blue-500 hover:bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              aria-label={`Toggle habit for ${date}`}
            >
              {isCompleted && <Check size={20} className="mx-auto" />}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <span>7 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
};

export default HabitCard;