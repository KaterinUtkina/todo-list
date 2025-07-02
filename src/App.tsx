import TodoCard from './todos/ui/TodoCard.tsx';
import { useCallback, useMemo, useState } from 'react';
import type { Todo } from './todos/types';
import { TodoListFilter } from './todos/enum';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoListFilter>(TodoListFilter.ALL);

  const handleAdd = useCallback((text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todoItem => (todoItem.id === id ? { ...todoItem, completed: !todoItem.completed } : todoItem))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todoItem => !todoItem.completed));
  }, []);

  const filters: { key: TodoListFilter; data: Todo[] }[] = useMemo(() => {
    return [
      { key: TodoListFilter.ALL, data: todos },
      { key: TodoListFilter.ACTIVE, data: todos.filter(todoItem => !todoItem.completed) },
      { key: TodoListFilter.COMPLETED, data: todos.filter(todoItem => todoItem.completed) },
    ];
  }, [todos]);

  const completedTodosCount = useMemo(() => {
    return todos.filter(todoItem => !todoItem.completed).length;
  }, [todos]);

  const activeIndex = useMemo(() => {
    return filters.findIndex(filterItem => filterItem.key === filter);
  }, [filter, filters]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10 relative font-sans">
      <div className="w-full max-w-xl relative h-[500px]">
        <h1 className="text-red-100 font-thin text-center mb-6">todos</h1>
        <div className="relative h-[360px]">
          {filters.map((filterItem, filterIndex) => {
            const cardPosition = (filterIndex - activeIndex + 3) % 3;
            const isAll = filterItem.key === TodoListFilter.ALL;

            return (
              <TodoCard
                key={filterItem.key}
                todos={filterItem.data}
                onAdd={handleAdd}
                onToggle={toggleTodo}
                onClearCompleted={clearCompleted}
                isActive={filterIndex === activeIndex}
                position={cardPosition}
                showInput={isAll}
                completedTodosCount={completedTodosCount}
                currentFilter={filter}
                onChangeFilter={setFilter}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
