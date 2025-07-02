import type { Todo } from '../types';
import { memo } from 'react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

const TodoItem = memo(({ todo, onToggle }: TodoItemProps) => {
  return (
    <li
      onClick={() => onToggle(todo.id)}
      className={`flex items-center px-4 py-2 border-b  border-gray-200 cursor-pointer ${
        todo.completed ? 'line-through text-gray-400' : ''
      }`}
    >
      <span className="mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-200">
        {todo.completed && (
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {todo.text}
    </li>
  );
});

export default TodoItem;