import { ColumnDef } from '@tanstack/react-table';
import { JpUser } from '../types';
import { useMemo } from 'react';

export const useUsersColumns = () => {
  return useMemo<ColumnDef<JpUser>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Company',
        accessorKey: 'company.name',
      },
    ],
    [],
  );
};
