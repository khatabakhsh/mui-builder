// *** Mui ***
import { Table, TableContainer } from '@mui/material';

// *** Styles and Types
import styles from './styles';

// *** Hooks and Contexts ***
import { useTableContext } from '../context/store';
import TableHeadComponent from './tableHead';
import TableBodyComponent from './tableBody';

const TableContent = () => {
  const { table, isDense, tableContainerSx, tableSx } = useTableContext();

  return (
    <TableContainer sx={styles.tableContainerSx({ tableContainerSx })}>
      <Table stickyHeader size={isDense ? 'small' : 'medium'} sx={styles.tableSx({ width: table.getCenterTotalSize(), tableSx })}>
        <TableHeadComponent />
        <TableBodyComponent />
      </Table>
    </TableContainer>
  );
};

export default TableContent;
