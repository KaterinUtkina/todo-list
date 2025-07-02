import type { Todo } from '../types';
import TodoItem from './TodoItem.tsx';
import { memo } from 'react';

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
}


const TodoList = memo(({ todos, onToggle }: Props) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

export default TodoList;