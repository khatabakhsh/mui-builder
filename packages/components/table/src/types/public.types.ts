import { SxProps, Theme } from '@mui/material';
import { CSSProperties } from 'react';

export type TableType = 'table';

export type TableProps = {
  id: string;
  columns: any[];
  data: any[];
  options?: any;
};

interface ITheme {
  theme?: Theme;
}
export type TSxStyles<T = ITheme> = (
  props?: T & ITheme
) => SxProps<Theme> & CSSProperties;
