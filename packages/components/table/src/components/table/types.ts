import { CSSProperties, ReactElement } from 'react';
import { ColumnDef, Row, TableOptions } from '@tanstack/react-table';
import { SxProps, Theme } from '@mui/material';

export default interface IProps<TData> {
  id: string;
  columns: ColumnDef<TData>[];
  data: TData[];
  renderSubComponent?: (props: { row: Row<TData> }) => ReactElement;
  options?: Partial<TableOptions<TData>>;
  tableContainerSx?: SxProps<Theme> & CSSProperties;
  tableSx?: SxProps<Theme> & CSSProperties;
}
