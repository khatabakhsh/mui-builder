import { Dispatch, SetStateAction } from 'react';
import TableProps from '../types';

export interface ITableContext extends Omit<TableProps<unknown>, 'columns' | 'data'> {
    allColumns?: TableProps<unknown>['columns'];
  table?: any;
  isDense?: boolean;
  setIsDense?: Dispatch<SetStateAction<boolean>>;
}

