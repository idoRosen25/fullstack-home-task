import { Table, flexRender } from '@tanstack/react-table';

import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Paper, TableContainer } from '@mui/material';

interface DataTableProps<TData> {
  table: Table<TData>;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData>({ table, onRowClick }: DataTableProps<TData>) {
  return (
    <div className="rounded-md w-full 2xl:min-w-[720px]">
      <TableContainer component={Paper}>
        <MuiTable className="w-full caption-bottom text-sm">
          <TableHead className="&_tr]:border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b transition-colors cursor-default"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      className="text-grey-200 p-4 first-of-type:border-l-0 border-l align-middle [&:has([role=checkbox])]:pr-0"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row.original);
                      table.resetRowSelection(true);
                      row.toggleSelected();
                    }
                  }}
                  className="border-b transition-colors  data-[state=selected]:bg-gray-400 cursor-pointer hover:bg-gray-400 group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="group-hover:border-l-white text-grey-200 p-4 first-of-type:border-l-0 border-l align-middle [&:has([role=checkbox])]:pr-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
}
