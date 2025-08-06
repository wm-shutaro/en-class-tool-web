import clsx from 'clsx';
import { Link } from 'react-router';

const WheelOfNamesLink: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <Link
      to="/wheel-of-names"
      className={clsx(className, 'flex items-center gap-1')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
      >
        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31-156.5T196-764l284 284v-400q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
      </svg>
      <span>Wheel of Names</span>
    </Link>
  );
};

export default WheelOfNamesLink;
