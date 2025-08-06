type GroupCardProps = {
  index: number;
  options: string[];
};

const GroupCard: React.FC<GroupCardProps> = ({ index, options }) => {
  return (
    <div className="flex w-md flex-col rounded-lg border shadow-sm">
      <div className="border-b-2 px-4 py-2">
        <div className="pb-2 text-center text-5xl italic">
          Group {index + 1}
        </div>
      </div>
      <div className="flex flex-col px-4 py-2">
        {options.map(option => (
          <div className="text-6xl">{option}</div>
        ))}
      </div>
    </div>
  );
};

export default GroupCard;
