import { Button } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';
import Option from './components/Option';
import { Outlet } from 'react-router';
import { useOptionsContext } from 'src/providers/Options';

const HomePage: React.FC = () => {
  const { options, addOption } = useOptionsContext();
  const optionsRef = useRef<HTMLDivElement>(null);
  const [prevOptionLength, setPrevOptionLength] = useState<number>(
    options.length,
  );

  useEffect(() => {
    if (options.length > prevOptionLength) {
      focusOption(options.length - 1);
    }
    setPrevOptionLength(options.length);
  }, [options.length, prevOptionLength]);

  const focusOption = (index: number) => {
    if (!optionsRef.current) return;
    const target = optionsRef.current.children[index];
    target?.getElementsByTagName('input')[0].focus();
  };

  const startNewLine = (index: number) => {
    if (index === options.length - 1) {
      addOption();
      return;
    }

    focusOption(index + 1);
  };

  return (
    <>
      <div className="flex h-full">
        <div className="grow">
          <Outlet />
        </div>
        <div className="flex flex-col gap-y-2 py-2">
          <div className="text-2xl">Entries</div>
          <div
            ref={optionsRef}
            className="flex grow flex-col gap-y-1 overflow-auto rounded-2xl border px-6 py-2"
          >
            {options.map((option, index) => (
              <Option
                key={index}
                option={option}
                index={index}
                onEnterKeyDown={startNewLine}
              />
            ))}
          </div>
          <Button
            onClick={addOption}
            className="text-text-dark bg-primary hover:border-primary-light border border-transparent py-2"
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
