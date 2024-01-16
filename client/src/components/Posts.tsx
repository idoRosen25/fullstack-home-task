import { CircularProgress, Typography } from '@mui/material';
import { useGetPostsQuery } from '../app/api/posts';
import { addAlert, setSelectedUser } from '../app/features/post/postSlice';
import { useAppDispatch } from '../app/hooks';
import useSelectedUser from '../hooks/useSelectedUser';
import CardGrid from './CardGrid';
import CreatePostModal from './CreatePostModal';
import { useEffect } from 'react';
import { AlertTypes } from '../types';

const Posts = () => {
  const selectedUser = useSelectedUser();
  const dispatch = useAppDispatch();
  const {
    data: posts,
    isLoading,
    isError,
    isFetching,
  } = useGetPostsQuery(selectedUser?.id, {
    skip: !selectedUser,
  });

  useEffect(() => {
    if (isError) {
      dispatch(
        addAlert({
          id: new Date().getTime(),
          type: AlertTypes.ERROR,
          text: `Failed to load posts for ${selectedUser?.name || 'user'}`,
        }),
      );
    }
  }, [dispatch, isError, selectedUser?.name]);

  if (!selectedUser) {
    return <></>;
  }

  return (
    <div className="flex flex-col  items-center justify-center w-full overflow-auto no-scrollbar mb-8">
      <div className="sm:ml-4 sm:my-4 md:ml-6 lg:mb-4 lg:mt-0 lg:ml-0 flex justify-between w-[calc(100%-3rem)]">
        <CreatePostModal userId={selectedUser.id} name={selectedUser.name} />
        <div className="flex gap-2 items-center">
          <CircularProgress
            size={'1rem'}
            sx={{ opacity: isLoading || isFetching ? '100%' : '0' }}
          />
          <Typography
            variant="h5"
            className="font-medium underline underline-offset-2 text-center"
          >
            {selectedUser.name}'s Posts
          </Typography>
        </div>
        <Typography
          variant="h6"
          sx={{ marginRight: '0.5rem', cursor: 'pointer' }}
          onClick={() => dispatch(setSelectedUser(null))}
        >
          X
        </Typography>
      </div>
      <div className="grid sm:px-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 w-full sm:items-center sm:justify-center lg:justify-start">
        <CardGrid data={posts || []} />
      </div>
    </div>
  );
};

export default Posts;
