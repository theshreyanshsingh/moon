import React from 'react';
import { TrendingUp, Target, Calendar } from 'lucide-react';
import { Habit } from '../types';

interface StatsProps {
  habits: Habit[];
}

const Stats: React.FC<StatsProps> = ({ habits }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const todayCompleted = habits.filter(h => 
    h.completedDates.includes(today)
  ).length;

  const totalHabits = habits.length;
  
  const completionRate = totalHabits > 0 
    ? Math.round((todayCompleted / totalHabits) * 100) 
    : 0;

  const getLast7DaysStreak = () => {
    if (habits.length === 0) return 0;
    
    let streak = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const completedCount = habits.filter(h => 
        h.completedDates.includes(dateStr)
      ).length;
      
      if (completedCount === habits.length && habits.length > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = getLast7DaysStreak();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Target className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Today's Progress</p>
            <p className="text-2xl font-bold text-gray-900">{todayCompleted}/{totalHabits}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Calendar className="text-purple-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Streak</p>
            <p className="text-2xl font-bold text-gray-900">{currentStreak} days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;