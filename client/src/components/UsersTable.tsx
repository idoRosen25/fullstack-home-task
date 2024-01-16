import { DataTable } from './DataTable';
import { AlertTypes, JpUser } from '../types';
import { useUsersColumns } from '../hooks/useUsersColumns';
import { useAppDispatch } from '../app/hooks';
import useSelectedUser from '../hooks/useSelectedUser';
import { addAlert, setSelectedUser } from '../app/features/post/postSlice';
import { CircularProgress } from '@mui/material';
import { useGetUsersQuery } from '../app/api/users';
import { useEffect } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

const UsersTable = () => {
  const dispatch = useAppDispatch();
  const selectedUser = useSelectedUser();

  const { data: usersData, isLoading, isError } = useGetUsersQuery('');

  const columns = useUsersColumns();

  const table = useReactTable({
    data: usersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (isError) {
      dispatch(
        addAlert({
          id: new Date().getTime(),
          type: AlertTypes.ERROR,
          text: 'Failed to load users from JP',
        }),
      );
    }
  }, [dispatch, isError]);

  useEffect(() => {
    if (!selectedUser) {
      table.resetRowSelection(true);
    }
  }, [selectedUser, table]);

  if (isLoading) {
    return <CircularProgress size="3rem" />;
  }

  return (
    <DataTable
      table={table}
      onRowClick={(user: JpUser) =>
        dispatch(setSelectedUser(user.id === selectedUser?.id ? null : user))
      }
    />
  );
};
export default UsersTable;
