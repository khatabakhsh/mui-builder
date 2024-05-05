import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TDynamicTableConfigStore, tableConfig } from './types';

const useTableConfigStore = create<TDynamicTableConfigStore, [['zustand/persist', unknown]]>(
  persist(
    (set, get) => ({
      configs: {},
      addTableConfig: (id: string, config: tableConfig) =>
        set({
          configs: {
            [id]: config
          }
        }),
      removeTableConfig: (id: string) => {
        const tempObj = get();
        delete tempObj?.configs?.[id];
        return set(tempObj);
      },
      updateTableConfig: (id: string, config: tableConfig) => {
        const tempObj = get();
        tempObj.configs[id] = config;
        return set(tempObj);
      }
    }),
    {
      name: 'table-configs-storage'
    }
  )
);
export default useTableConfigStore;
