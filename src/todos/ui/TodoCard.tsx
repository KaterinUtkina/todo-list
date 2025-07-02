import type { Todo } from '../types';
import TodoList from './TodoList';
import TodoInput from './TodoInput.tsx';
import { getPluralForm } from '../../helpers/pluraliz.ts';
import { TodoListFilter } from '../enum';
import { memo } from 'react';

interface Props {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: number) => void;
  onClearCompleted: () => void;
  isActive: boolean;
  position: number;
  showInput: boolean;
  completedTodosCount: number;
  onChangeFilter: (filter: TodoListFilter) => void;
  currentFilter: TodoListFilter;
}

const TodoCard = memo(({
  todos,
  onAdd,
  onToggle,
  onClearCompleted,
  isActive,
  position,
  showInput,
  completedTodosCount,
  onChangeFilter,
  currentFilter,
}: Props) => {
  const inputHeight = 52;
  const footerHeight = 60;
  const z = 10 - position;
  const topOffset = position * 10;
  const decrementPx = position * 10;

  const widthStyle = isActive
    ? { width: '100%' }
    : { width: `calc(100% - ${decrementPx}px)` };

  const heightListStyle = {
    height: `calc(100% - ${showInput ? `${inputHeight}px` : '0px'} - ${footerHeight}px)`,
  };

  return (
    <div
      className={'absolute left-0 right-0 h-full mx-auto transition-all duration-300 bg-white shadow-md rounded overflow-hidden'}
      style={{ top: `${topOffset}px`, zIndex: z, ...widthStyle }}
    >
      <div className="flex flex-col h-full">
        {showInput && <TodoInput onAdd={onAdd} />}

        {isActive && (
          <div style={heightListStyle} className={'overflow-auto'}>
            <TodoList todos={todos} onToggle={onToggle} />
          </div>
        )}

        {/* Footer */}
        {isActive && (
          <div className="flex justify-between items-center text-sm text-gray-400 mt-auto p-4">
            <span>{completedTodosCount} {getPluralForm(completedTodosCount, ['item', 'items', 'items'])} left</span>
            <div className="space-x-2">
              {([TodoListFilter.ALL, TodoListFilter.ACTIVE, TodoListFilter.COMPLETED]).map(filterItem => (
                <button
                  key={filterItem}
                  onClick={() => onChangeFilter(filterItem)}
                  className={`cursor-pointer px-2 py-1 border rounded ${
                    currentFilter === filterItem ? 'border-gray-200' : 'border-transparent'
                  }`}
                >
                  {filterItem}
                </button>
              ))}
            </div>
            <button onClick={onClearCompleted} className={'cursor-pointer'}>Clear completed</button>
          </div>
        )}
      </div>
    </div>
  );
});

export default TodoCard;