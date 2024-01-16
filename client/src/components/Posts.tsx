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
      <div className="mb-2 sm:my-4 md:ml-0 lg:mb-4 lg:mt-8 lg:ml-0 xl:mt-[2.75rem] flex justify-between items-end w-full sm:w-[calc(100%-3rem)]">
        <CreatePostModal userId={selectedUser.id} name={selectedUser.name} />
        <div className="flex gap-2 items-center">
          {(isLoading || isFetching) && <CircularProgress size={'1rem'} />}
          <span className="max-w-[200px] sm:max-w-[300px] md:max-w-max text-2xl lg:text-3xl font-medium underline underline-offset-2 text-center">
            {selectedUser.name}'s Posts
          </span>
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
