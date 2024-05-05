// *** Mui ***
import { Box, Stack, TableCell, TableHead, TableRow, useTheme } from '@mui/material';

// *** Third-party packages ***
import { Header, flexRender } from '@tanstack/react-table';

// *** Styles and Types
import styles from './../styles';

import { useTableContext } from '../../context/store';

const TableHeadComponent = () => {
  const theme = useTheme();
  const { table } = useTableContext();

  return (
    <TableHead>
      <TableRow>
        {table.getFlatHeaders().map((header: Header<any, unknown>) => (
          <TableCell
            key={header.id}
            colSpan={header.colSpan}
            sx={styles.tableCellSx({
              width: header.getSize(),
              padding: ['expander', 'select'].some((item) => item === header.id) ? '0px' : 'none'
            })}
            sortDirection={header.column.getAutoSortDir()}
          >
            {header.isPlaceholder ? null : header.column.getCanSort() ? (
              <Stack
                direction="row"
                gap="4px"
                alignItems="center"
                sx={styles.headerPlaceholderSx()}
                onClick={header.column.getToggleSortingHandler()}
              >
                <Stack spacing="-3px">
                  {/* <Icon
                    name="CaretUp"
                    size={0.688}
                    fill={header.column.getIsSorted() === 'asc' ? theme.palette.primary[400] : theme.palette.greyTwo[400]}
                  /> */}
                  {/* <Icon
                    name="CaretDown"
                    size={0.688}
                    fill={header.column.getIsSorted() === 'desc' ? theme.palette.primary[400] : theme.palette.greyTwo[400]}
                  /> */}
                </Stack>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </Stack>
            ) : (
              flexRender(header.column.columnDef.header, header.getContext())
            )}
            {header.column.getCanResize() && (
              <Box
                {...{
                  onDoubleClick: () => header.column.resetSize(),
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                  className: 'resizer',
                  sx: { ...styles.resizeBoxSx({ theme }) }
                }}
              />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default TableHeadComponent;
