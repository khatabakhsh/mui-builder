import { Column } from '@tanstack/table-core';

interface ITableSettingsModalProps {
  openSettings: boolean;
  handleModalSettings: () => void;
}
type TColumn = Column<any>;
export type { ITableSettingsModalProps, TColumn };
