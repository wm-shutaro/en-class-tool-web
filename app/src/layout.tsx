import { Link, Outlet } from 'react-router';
import WheelOfNamesLink from './components/WheelOfNamesLink';
import GroupingLink from './components/GroupingLink';
import PickingLink from './components/PickingLink';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const Layout: React.FC = () => {
  return (
    <>
      <header className="bg-primary fixed z-10 w-full shadow-lg">
        <div className="flex h-14 w-full items-center justify-between gap-8 pr-4 pl-4">
          <Link to="/" className="!text-text-dark text-2xl">
            English Class Tool
          </Link>
          <div className="text-md hidden grow gap-6 md:flex">
            <WheelOfNamesLink className="!text-text-dark fill-text-dark" />
            <GroupingLink className="!text-text-dark fill-text-dark" />
            <PickingLink className="!text-text-dark fill-text-dark" />
          </div>
          <Menu>
            <MenuButton className="md:!hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="fill-text-dark"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </MenuButton>
            <MenuItems
              anchor={{ to: 'left start', offset: '4px' }}
              transition
              className="bg-bg dark:bg-bg-dark z-11 rounded border focus-visible:outline-none"
            >
              <MenuItem>
                {({ close }) => (
                  <WheelOfNamesLink
                    onClick={close}
                    className="hover:bg-bg/20 !text-text dark:!text-text-dark dark:fill-text-dark px-1.5 py-2"
                  />
                )}
              </MenuItem>
              <MenuItem>
                {({ close }) => (
                  <GroupingLink
                    onClick={close}
                    className="hover:bg-bg/20 !text-text dark:!text-text-dark dark:fill-text-dark px-1.5 py-2"
                  />
                )}
              </MenuItem>
              <MenuItem>
                {({ close }) => (
                  <PickingLink
                    onClick={close}
                    className="hover:bg-bg/20 !text-text dark:!text-text-dark dark:fill-text-dark px-1.5 py-2"
                  />
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </header>
      <div className="h-screen px-4 pt-16">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
