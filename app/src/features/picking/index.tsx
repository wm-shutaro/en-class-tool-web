import { Button, Input } from '@headlessui/react';
import { useState, type ChangeEvent } from 'react';
import { useOptionsContext } from 'src/providers/Options';
import { shuffledArray } from 'src/utils/array';

const Picking: React.FC = () => {
  const { availables } = useOptionsContext();
  const [count, setCount] = useState<number>(0);
  const [picked, setPicked] = useState<string[]>([]);

  const onEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      pickPeople();
    }
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value));
  };

  const pickPeople = () => {
    const options = shuffledArray(availables);
    const picked = options.slice(0, count);
    setPicked(picked);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-nowrap">Input the number of people: </div>
        <div className="flex gap-2">
          <Input
            type="number"
            onKeyDown={onEnterKeyDown}
            onChange={onChangeInput}
          />
          <Button
            onClick={pickPeople}
            className="bg-primary hover:border-primary-light text-text-dark border border-transparent px-4 py-2"
          >
            Pick
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 overflow-auto p-5">
        {picked.map((option, index) => (
          <div
            key={index}
            className="border-primary rounded-xl border-2 p-4 text-5xl shadow-sm"
          >
            {index + 1}: {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Picking;
