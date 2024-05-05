import { useEffect, useState } from 'react';

// *** Mui ***
import { Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography, useTheme } from '@mui/material';

// *** Icons ***
import { IconSearch } from '@tabler/icons-react';

// *** Styles and Types ***
import styles from './../styles';
import { TColumn } from '../types';

const TableModalExistsColumns = ({
  visibleColumns,
  allColumns,
  visibleCols,
  setVisibleCols
}: {
  visibleColumns: any;
  allColumns: any;
  visibleCols: any;
  setVisibleCols: any;
}) => {
  const [existingColsSearch, setExistingColsSearch] = useState('');
  const theme = useTheme();
  useEffect(() => {
    return () => {
      setExistingColsSearch('');
    };
  }, []);
  return (
    <Box flex={1} paddingX="16px">
      <Typography fontSize="16px" fontWeight={500} color={theme.palette.grey[900]}>
        ستون‌های موجود
      </Typography>
      <TextField
        value={existingColsSearch}
        onChange={(e) => setExistingColsSearch(e.target.value)}
        placeholder="جستجو در ستون‌های موجود"
        InputProps={{ startAdornment: <IconSearch color={theme.palette.grey[500]} style={styles.searchInputElementSx()} /> }}
        fullWidth
        sx={styles.searchInputSx({ theme })}
      />
      <FormGroup sx={styles.visibleColumnsContainerSx()}>
        {visibleColumns
          .filter((item: TColumn) => item.getCanHide() && item.columnDef.header?.toString().includes(existingColsSearch))
          .sort((a: TColumn, b: TColumn) => {
            if ((a?.columnDef?.header as string) < (b?.columnDef?.header as string)) return -1;
            if ((a?.columnDef?.header as string) > (b?.columnDef?.header as string)) return 1;
            return 0;
          })
          .map((column: TColumn) => (
            <FormControlLabel
              key={column.id}
              id={column.id}
              name={column.id}
              value={column.id}
              label={
                <Typography fontSize="12px" fontWeight={500} color={theme.palette.grey[900]}>
                  {allColumns.find((item: any) => item.id === column.id)?.header as string}
                </Typography>
              }
              control={
                <Checkbox
                  checked={visibleCols[column.id]}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  icon={<Box borderRadius="6px" width={24} height={24} bgcolor={theme.palette.grey[100]} />}
                  checkedIcon={
                    <Box sx={styles.checkboxCheckedIconSx({ theme })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path
                          d="M2 4.5L4.5 7L9.5 2"
                          stroke={theme.palette.primary.main}
                          strokeWidth="2.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  }
                />
              }
              onChange={(e: any, checked) => {
                setVisibleCols((prev: any) => ({ ...prev, [e.target.value]: checked }));
              }}
            />
          ))}
      </FormGroup>
    </Box>
  );
};
export default TableModalExistsColumns;
