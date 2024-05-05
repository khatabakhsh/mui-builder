'use client';

// *** React and Next ***
import { useEffect, useMemo, useState } from 'react';

// *** Mui ***
import { Button, Dialog, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { Box, Stack } from '@mui/system';

// *** Hooks and Contexts
import useTableConfigStore from '../../../../hooks/useTableConfigStore';
import { useTableContext } from '../../context/store';

// *** Styles and Types ***
import TableModalExistsColumns from './existsColumns';
import TableSelectedColumns from './selectedColumns';
import styles from './styles';
import { ITableSettingsModalProps, TColumn } from './types';

const TableSettingsModal = ({ openSettings, handleModalSettings }: ITableSettingsModalProps) => {
  const theme = useTheme();
  const { allColumns, table, id } = useTableContext();
  const { removeTableConfig } = useTableConfigStore();
  const visibleColumns: TColumn[] = useMemo(() => table.getVisibleLeafColumns(), [table]);
  const [orderedCols, setOrderedCols] = useState<string[] | []>([]);
  const [visibleCols, setVisibleCols] = useState<any>({});
  useEffect(() => {
    if (openSettings) {
      setOrderedCols(visibleColumns.map((item: TColumn) => item.id));
      setVisibleCols(visibleColumns.reduce((a, v) => ({ ...a, [v.id]: v.getIsVisible() }), {}));
    }
  }, [openSettings, visibleColumns]);

  return (
    <Dialog open={openSettings} onClose={handleModalSettings} maxWidth="md" fullWidth>
      <Box padding="24px">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography fontSize="18px" fontWeight={500} position="relative" color={theme.palette.grey[900]}>
            مدیریت ستون‌ها
          </Typography>
          <IconButton onClick={handleModalSettings}>
            {/* <Icon name="Close" size={1.5} stroke={theme.palette.grey[700]} /> */}
          </IconButton>
        </Stack>
        <Typography mt="8px" fontSize="14px" fontWeight={400} color={theme.palette.grey[500]}>
          ستون‌هایی که می‌خواهید در جدول نمایش داده شود را انتخاب کنید
        </Typography>
        <Divider sx={styles.dividerSx({ my: '16px' })} />
        <Stack direction="row">
          <TableModalExistsColumns
            visibleColumns={visibleColumns}
            allColumns={allColumns}
            visibleCols={visibleCols}
            setVisibleCols={setVisibleCols}
          />
          <Box position="relative">
            <Divider orientation="vertical" sx={styles.dividerSx({ mx: '15px' })} />
            {/* <Icon name="CircleArrowLeft" size={1.5} stroke={theme.palette.primary[200]} fill="white" style={styles.arrowLeftIconSx()} /> */}
          </Box>
          <TableSelectedColumns
            setOrderedCols={setOrderedCols}
            visibleColumns={visibleColumns}
            orderedCols={orderedCols}
            allColumns={allColumns}
            visibleCols={visibleCols}
            setVisibleCols={setVisibleCols}
          />
        </Stack>
        <Divider sx={styles.dividerSx({ my: '16px' })} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing="16px">
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              sx={styles.saveButtonSx()}
              onClick={() => {
                table.setColumnVisibility(visibleCols);
                table.setColumnOrder(orderedCols);
                handleModalSettings();
              }}
            >
              ذخیره
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleModalSettings();
              }}
            >
              انصراف
            </Button>
          </Stack>
          <Button
            variant="text"
            sx={styles.resetButtonSx({ theme })}
            onClick={() => {
              removeTableConfig(id);
              table.resetColumnVisibility();
              table.resetColumnOrder();
              table.resetColumnSizing();
              handleModalSettings();
            }}
          >
            تنظیم مجدد حالت پیش فرض
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
export default TableSettingsModal;
