import React, { useCallback, useContext, useEffect, useState } from 'react';

const initialOptions: Option[] = [
  { value: 'Name 1', available: true },
  { value: 'Name 2', available: true },
  { value: 'Name 3', available: true },
  { value: 'Name 4', available: true },
  { value: 'Name 5', available: true },
  { value: 'Name 6', available: true },
];

type Props = {
  children: React.ReactNode;
};

export type Option = {
  value: string;
  available: boolean;
};

export type OptionsContext = {
  options: Option[];
  availables: string[];
  addOption: () => void;
  updateOption: (index: number, option: Option) => void;
  deleteOption: (index: number) => void;
};

const OptionsContext = React.createContext<OptionsContext>(
  {} as OptionsContext,
);

export const useOptionsContext = (): OptionsContext => {
  return useContext(OptionsContext);
};

export const OptionsContextProvider = (props: Props) => {
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [availables, setAvailables] = useState<string[]>(
    initialOptions.map(option => option.value),
  );

  const saveOptions = useCallback((newOptions: Option[]) => {
    setOptions(newOptions);
    setAvailables(getAvailables(newOptions));
    localStorage.setItem('options', JSON.stringify(newOptions));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('options');
    if (!saved) return;

    const savedOptions = JSON.parse(saved);
    saveOptions(savedOptions);
  }, [saveOptions]);

  const getAvailables = (options: Option[]): string[] => {
    if (!options) return [];
    return options
      .filter(option => option.available && option.value !== '')
      .map(option => option.value);
  };

  const addOption = () => {
    const newOptions = [...options];
    newOptions.push({ value: '', available: true });
    saveOptions(newOptions);
  };

  const updateOption = (index: number, option: Option) => {
    const newOptions = [...options];
    newOptions[index] = option;
    saveOptions(newOptions);
  };

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    saveOptions(newOptions);
  };

  const value: OptionsContext = {
    options,
    availables,
    addOption,
    updateOption,
    deleteOption,
  };

  return (
    <OptionsContext.Provider value={value}>
      {props.children}
    </OptionsContext.Provider>
  );
};
