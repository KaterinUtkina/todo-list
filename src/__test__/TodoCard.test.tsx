import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../todos/ui/TodoCard';
import { TodoListFilter } from '../todos/enum';

const sampleTodos = [
    { id: 1, text: 'Задача 1', completed: false },
    { id: 2, text: 'Задача 2', completed: true },
];

describe('TodoCard tests', () => {
    test('Рендеринг TodoCard с разными позициями', () => {
        const { rerender } = render(
          <TodoCard
            todos={sampleTodos}
            onAdd={() => {}}
            onToggle={() => {}}
            onClearCompleted={() => {}}
            isActive={true}
            position={0}
            showInput={true}
            completedTodosCount={1}
            onChangeFilter={() => {}}
            currentFilter={TodoListFilter.ALL}
          />
        );

        expect(screen.getByPlaceholderText(/what needs to be done/i)).toBeInTheDocument();

        rerender(
          <TodoCard
            {...{
                todos: sampleTodos,
                onAdd: () => {},
                onToggle: () => {},
                onClearCompleted: () => {},
                isActive: true,
                position: 2,
                showInput: true,
                completedTodosCount: 1,
                onChangeFilter: () => {},
                currentFilter: TodoListFilter.ALL,
            }}
          />
        );

        expect(screen.getByPlaceholderText(/what needs to be done/i)).toBeInTheDocument();
    });

    test('Активная кнопка фильтра выделена', () => {
        const onChangeFilter = jest.fn();

        render(
          <TodoCard
            todos={sampleTodos}
            onAdd={() => {}}
            onToggle={() => {}}
            onClearCompleted={() => {}}
            isActive={true}
            position={0}
            showInput={true}
            completedTodosCount={1}
            onChangeFilter={onChangeFilter}
            currentFilter={TodoListFilter.ACTIVE}
          />
        );

        const activeButton = screen.getByRole('button', { name: TodoListFilter.ACTIVE });
        expect(activeButton).toHaveClass('border-gray-200');

        const allButton = screen.getByRole('button', { name: TodoListFilter.ALL });
        expect(allButton).toHaveClass('border-transparent');

        fireEvent.click(allButton);
        expect(onChangeFilter).toHaveBeenCalledWith(TodoListFilter.ALL);
    });
});