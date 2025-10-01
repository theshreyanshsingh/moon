import React, { useState, useEffect } from 'react';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';
import Stats from './components/Stats';
import { Habit } from './types';

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      completedDates: [],
      createdAt: new Date().toISOString()
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id: string, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const completedDates = habit.completedDates.includes(date)
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date];
        return { ...habit, completedDates };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Habit Tracker</h1>
          <p className="text-gray-600">Build better habits, one day at a time</p>
        </header>

        <div className="grid gap-6">
          <Stats habits={habits} />
          <AddHabitForm onAdd={addHabit} />
          <HabitList 
            habits={habits} 
            onToggle={toggleHabit} 
            onDelete={deleteHabit} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;