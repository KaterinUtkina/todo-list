import { useState, type FormEvent, memo } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

const TodoInput = memo(({ onAdd }: Props) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full p-4 text-lg border-b border-gray-200 outline-none placeholder:text-gray-300 placeholder:italic"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
});

export default TodoInput;