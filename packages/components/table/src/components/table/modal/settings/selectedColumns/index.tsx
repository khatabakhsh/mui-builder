import { useEffect, useState } from 'react';

// *** Mui ***
import { Box, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';

// *** Third-party packages ***
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// *** Icons ***
import { IconSearch } from '@tabler/icons-react';

// *** Styles and Types ***
import IProps from '../../../types';
import { TColumn } from '../types';
import styles from './../styles';

const DraggableBox = <TData,>({
  allColumns,
  column,
  setVisibleCols
}: {
  allColumns: IProps<TData>['columns'];
  column: IProps<TData>['columns'][number];
  setVisibleCols: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) => {
  const theme = useTheme();
  const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
    id: column.id as string
  });

  return (
    <Box
      key={column.id}
      sx={styles.draggableBoxSx({ theme, isDragging, transform: CSS.Translate.toString(transform) })}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Typography color={theme.palette.grey[600]} fontSize="14px" fontWeight={500} lineHeight="20px">
        {allColumns.find((item) => item?.id === column?.id)?.header as string}
      </Typography>
      <IconButton onClick={() => setVisibleCols((prev) => ({ ...prev, [column.id as string]: false }))}>
        {/* <Icon name="Close" size={1.4} stroke={theme.palette.grey[600]} /> */}
      </IconButton>
    </Box>
  );
};

const TableSelectedColumns = <TData,>({
  orderedCols,
  allColumns,
  visibleColumns,
  visibleCols,
  setVisibleCols,
  setOrderedCols
}: {
  orderedCols: any;
  visibleColumns: any;
  allColumns: any;
  visibleCols: any;
  setVisibleCols: any;
  setOrderedCols: any;
}) => {
  const theme = useTheme();
  const [selectedColsSearch, setSelectedColsSearch] = useState('');
  useEffect(() => {
    return () => {
      setSelectedColsSearch('');
    };
  }, []);
  const existingColsLength = orderedCols
    .map((item: string) => visibleColumns.find((column: TColumn) => column.id === item))
    .filter(
      (item: TColumn) => item?.getCanHide() && visibleCols[item?.id] && item?.columnDef.header?.toString().includes(selectedColsSearch)
    ).length;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6
      }
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setOrderedCols((columnOrder: string[]) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }
  return (
    <Box flex={1} paddingX="16px">
      <Stack spacing="8px" direction="row" alignItems="center">
        <Typography fontSize="16px" fontWeight={500} color={theme.palette.grey[900]}>
          ستون‌های انتخاب شده
        </Typography>
        <Box sx={styles.selectedColumnsSx({ theme })}>{existingColsLength >= 10 ? existingColsLength : `0${existingColsLength}`}</Box>
      </Stack>
      <TextField
        value={selectedColsSearch}
        onChange={(e) => setSelectedColsSearch(e.target.value)}
        placeholder="جستجو در ستون‌های انتخاب شده"
        InputProps={{ startAdornment: <IconSearch color={theme.palette.grey[500]} style={styles.searchInputElementSx()} /> }}
        fullWidth
        sx={styles.searchInputSx({ theme })}
      />
      <Stack spacing="16px" maxHeight="350px" overflow="auto" pr="10px">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          {orderedCols
            .map((item: string) => visibleColumns.find((column: TColumn) => column.id === item))
            .filter(
              (item: TColumn) =>
                item?.getCanHide() && visibleCols[item?.id] && item?.columnDef.header?.toString().includes(selectedColsSearch)
            )
            .map((column: TColumn) => (
              <SortableContext key={column?.id} items={orderedCols} strategy={verticalListSortingStrategy}>
                <DraggableBox allColumns={allColumns} column={column as IProps<TData>['columns'][number]} setVisibleCols={setVisibleCols} />
              </SortableContext>
            ))}
        </DndContext>
      </Stack>
    </Box>
  );
};
export default TableSelectedColumns;
