import { createContext, useContext } from 'react';
import { ITableContext } from './types';

const TableContext = createContext({
  id: '',
  columns: [],
  data: []
} as ITableContext);

const useTableContext = () => {
  const contextTable = useContext<ITableContext>(TableContext);
  return contextTable;
};
export { TableContext, useTableContext };
