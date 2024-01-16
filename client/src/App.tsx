import { twMerge } from 'tailwind-merge';
import './App.css';
import { useAppSelector } from './app/hooks';
import Posts from './components/Posts';
import Toaster from './components/Toaster';
import UsersTable from './components/UsersTable';
import useSelectedUser from './hooks/useSelectedUser';
import { useEffect, useMemo, useState } from 'react';
import { MIN_DUAL_DISPLAY_WIDTH } from './consts';

function App() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const alerts = useAppSelector((state) => state.posts.alerts);
  const selectedUser = useSelectedUser();

  const shouldHideTable = useMemo(
    () => selectedUser && windowSize < MIN_DUAL_DISPLAY_WIDTH,
    [selectedUser, windowSize],
  );

  useEffect(() => {
    // add resize listener to adjust display of user table and posts grid on window resize
    const onResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="m-10 flex flex-col gap-6">
      <h1 className={twMerge('text-6xl', shouldHideTable ? 'hidden' : '')}>
        Users
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 h-[45rem] w-full">
        <section
          className={twMerge(
            'col-span-1 lg:col-span-2',
            shouldHideTable ? 'hidden' : '',
          )}
        >
          <UsersTable />
        </section>
        <section className="col-span-3 lg:-mt-[52px]">
          <Posts />
        </section>
      </div>

      <div className="absolute top-5 right-5 flex flex-col gap-4 w-max items-end">
        {alerts.length !== 0 &&
          alerts.map((alert) => <Toaster key={alert.id} {...alert} />)}
      </div>
    </div>
  );
}

export default App;
