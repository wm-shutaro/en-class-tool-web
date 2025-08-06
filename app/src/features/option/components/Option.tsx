import { Button, Checkbox, Input } from '@headlessui/react';
import clsx from 'clsx';
import type React from 'react';
import {
  useOptionsContext,
  type Option as OptionType,
} from 'src/providers/Options';

type OptionProps = {
  index: number;
  option: OptionType;
  onEnterKeyDown: (index: number) => void;
};

const Option: React.FC<OptionProps> = ({ index, option, onEnterKeyDown }) => {
  const { updateOption, deleteOption } = useOptionsContext();

  const onChangeChecked = (checked: boolean) => {
    updateOption(index, { value: option.value, available: checked });
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateOption(index, {
      value: event.target.value,
      available: option.available,
    });
  };

  const onClickDelete = () => {
    deleteOption(index);
  };

  const handleKeyDowm = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnterKeyDown(index);
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      <Checkbox
        checked={option.available}
        tabIndex={-1}
        onChange={onChangeChecked}
        className="group border-border dark:border-border-dark focus:border-primary size-6 rounded border-2 outline-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          className="fill-border dark:fill-border-dark opacity-0 group-data-checked:opacity-100"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      </Checkbox>
      <Input
        type="text"
        value={option.value}
        onChange={onChangeValue}
        onKeyDown={handleKeyDowm}
        className={clsx(!option.available && 'bg-disabled')}
      />
      <Button
        tabIndex={-1}
        onClick={onClickDelete}
        className="bg-danger hover:border-danger-light h-8 w-8 border border-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </Button>
    </div>
  );
};

export default Option;
