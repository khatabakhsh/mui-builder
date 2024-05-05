type tableConfig = {
  isDense: boolean;
  columnVisibility: Record<string, boolean>;
  columnOrder: string[];
  columnSizing: Record<string, number>;
};
type tableConfigs = {
  [key: string]: tableConfig;
};

type TDynamicTableConfigStore = {
  addTableConfig: (id: string, config: tableConfig) => void;
  removeTableConfig: (id: string) => void;
  updateTableConfig: (id: string, config: tableConfig) => void;
  configs: tableConfigs;
};

export type { tableConfig, tableConfigs, TDynamicTableConfigStore };
