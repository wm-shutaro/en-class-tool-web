import { Button, Input } from '@headlessui/react';
import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { useOptionsContext } from 'src/providers/Options';
import GroupCard from './components/GroupCard';
import { shuffledArray } from 'src/utils/array';

const Grouping: React.FC = () => {
  const { availables } = useOptionsContext();
  const [groupCount, setGroupCount] = useState<number>(0);
  const [countPerGroup, setCountPerGroup] = useState<number[]>([]);
  const [groups, setGroups] = useState<string[][]>([]);

  const calculateCountPerGroup = useCallback(
    (groupCount: number) => {
      const baseCount = Math.floor(availables.length / groupCount);
      const extraCount = availables.length % groupCount;

      const result = [];
      for (let i = 0; i < groupCount; i++) {
        result.push(i < extraCount ? baseCount + 1 : baseCount);
      }

      setCountPerGroup(result);
    },
    [availables.length],
  );

  useEffect(() => {
    calculateCountPerGroup(groupCount);
  }, [availables, calculateCountPerGroup, groupCount]);

  const onEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createGroup();
    }
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupCount(parseInt(event.target.value));
  };

  const createGroup = () => {
    if (countPerGroup.length === 0) return;

    const options = shuffledArray(availables);

    const newGroups: string[][] = [];
    countPerGroup.forEach(count => {
      const group: string[] = [];
      for (let i = 0; i < count; i++) {
        const option = options.pop();
        if (option) {
          group.push(option);
        }
      }
      newGroups.push(group);
    });

    setGroups(newGroups);
  };

  const makeCountPerGroupText = (): string => {
    if (countPerGroup.length === 0) return '';

    const min = countPerGroup.reduce((previous, current) =>
      Math.min(previous, current),
    );
    const max = countPerGroup.reduce((previous, current) =>
      Math.max(previous, current),
    );
    const text = min === max ? min : `${min} - ${max}`;

    return `(the count per group: ${text})`;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <div>Input the number of group: </div>
        <Input
          type="number"
          onKeyDown={onEnterKeyDown}
          onChange={onChangeInput}
        />
        <Button
          onClick={createGroup}
          className="bg-primary hover:border-primary-light text-text-dark border border-transparent p-2"
        >
          Create
        </Button>
        <div>{makeCountPerGroupText()}</div>
      </div>
      <div className="flex flex-wrap gap-4 overflow-auto p-5">
        {groups.map((group, index) => (
          <GroupCard index={index} options={group} />
        ))}
      </div>
    </div>
  );
};

export default Grouping;
