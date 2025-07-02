import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Todo App', () => {
    const addTodo = (text: string) => {
        const input = screen.getByPlaceholderText(/what needs to be done/i);
        fireEvent.change(input, { target: { value: text } });
        const form = screen.getByTestId('todo-form');
        fireEvent.submit(form);
    };

    test('1. Добавляет новую задачу', () => {
        render(<App />);
        addTodo('Первая задача');
        expect(screen.getByText((content) => content.includes('Первая задача'))).toBeDefined();
    });

    test('2. Переключает состояние задачи', () => {
        render(<App />);
        addTodo('Вторая задача');

        const task = screen.getByText('Вторая задача');
        fireEvent.click(task);

        expect(task).toBeInTheDocument();
    });

    test('3. Фильтрует задачи по статусу', () => {
        render(<App />);
        addTodo('Активная задача');
        addTodo('Завершенная задача');

        fireEvent.click(screen.getByText('Завершенная задача'));

        fireEvent.click(screen.getByText('active'));
        expect(screen.getByText('Активная задача')).toBeInTheDocument();
        expect(screen.queryByText('Завершенная задача')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('completed'));
        expect(screen.getByText('Завершенная задача')).toBeInTheDocument();
        expect(screen.queryByText('Активная задача')).not.toBeInTheDocument();
    });

    test('4. Удаляет завершённые задачи', () => {
        render(<App />);
        addTodo('Завершенная задача');

        fireEvent.click(screen.getByText('Завершенная задача'));
        fireEvent.click(screen.getByText('Clear completed'));

        expect(screen.queryByText('Завершенная задача')).not.toBeInTheDocument();
    });
});