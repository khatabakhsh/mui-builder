import { Button, useTheme } from '@mui/material';
import TableSettingsModal from '../../modal/settings';
import styles from '../styles';
import { useState } from 'react';

const TableColumnManagement = () => {
  const theme = useTheme();
  const [openSettings, setOpenSettings] = useState(false);

  const handleModalSettings = () => {
    setOpenSettings((prev) => !prev);
  };
  return (
    <>
      <Button
        variant="outlined"
        // startIcon={<Icon name="Settings" stroke={theme.palette.greyTwo[700]} fill="none" size={1.25} />}
        sx={styles.buttonSx({ theme })}
        onClick={handleModalSettings}
      >
        مدیریت ستون‌ها
      </Button>
      <TableSettingsModal openSettings={openSettings} handleModalSettings={handleModalSettings} />
    </>
  );
};
export default TableColumnManagement;
