import { Button, ButtonGroup, IconButton, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { useTableContext } from '../context/store';
import TableColumnManagement from './columnManagement';
import styles from './styles';

const TableToolbar = () => {
  const theme = useTheme();
  const { isDense, setIsDense } = useTableContext();

  return (
    <Box 
    // sx={styles.toolbarContainerSx()}
    >
      <Box className="start">
        {/* <ButtonGroup
          variant="outlined"
          sx={styles.toolbarButtonGroupSx({ theme })}
        >
          <IconButton onClick={() => setIsDense(false)}>
            <Icon name="MediumTable" fill="none" size={1.25} stroke={!isDense ? theme.palette.greyTwo[700] : theme.palette.greyTwo[400]} />
          </IconButton>
          <IconButton onClick={() => setIsDense(true)}>
            <Icon name="DenseTable" fill="none" size={1.25} stroke={isDense ? theme.palette.greyTwo[700] : theme.palette.greyTwo[400]} />
          </IconButton>
        </ButtonGroup> */}
      </Box>
      <Box className="end">
        <Button
          variant="outlined"
          // startIcon={<Icon name="Printer" stroke={theme.palette.greyTwo[700]} fill="none" size={1.25} />}
          sx={styles.buttonSx({ theme })}
        >
          خروجی
        </Button>
        <TableColumnManagement />
      </Box>
    </Box>
  );
};
export default TableToolbar;
