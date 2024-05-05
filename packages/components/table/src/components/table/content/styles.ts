import { CSSProperties } from 'react';
import { SxProps, Theme } from '@mui/material';
import { TSxStyles } from '../../../types/public.types';

const tableContainerSx: TSxStyles<{ tableContainerSx?: SxProps<Theme> & CSSProperties }> = (props) => ({
  maxHeight: 500,
  borderRadius: '12px',
  ...props?.tableContainerSx
});

const tableSx: TSxStyles<{ width: number; tableSx?: SxProps<Theme> & CSSProperties }> = (props) => ({
  width: `${props?.width}px`,
  ...props?.tableSx
});

const tableCellSx: TSxStyles<{ width: string | number; padding: string | 'none' }> = (props) => ({
  width: props?.width,
  padding: props?.padding
});

const headerPlaceholderSx: TSxStyles = () => ({
  cursor: 'pointer',
  display: 'inline-flex'
});

const resizeBoxSx: TSxStyles = (props) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: '0px',
  height: '22px',
  width: '1px',
  backgroundColor: props?.theme?.palette.grey[400],
  cursor: 'col-resize',
  userSelect: 'none',
  touchAction: 'none'
});

const tableHeadStyles = { tableContainerSx, tableSx, tableCellSx, headerPlaceholderSx, resizeBoxSx };
export default tableHeadStyles;
