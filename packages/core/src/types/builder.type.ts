import { Configs, FieldProps, FormTypes } from '@mui-builder/form';
import { GridProps, GridTypes } from '@mui-builder/grid';
import { TableProps, TableType } from '@mui-builder/table';

export type GROUP_TYPE = 'form' | 'grid' | 'table';

export type BuilderProps = {
  id?: string;
  groupType: GROUP_TYPE;
  type: FormTypes | GridTypes | TableType;
  props: FieldProps | GridProps | TableProps;
  configs?: Configs;
};
