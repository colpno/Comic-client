import { DataGridProps as MUIDataGridProps, GridSortModel } from '@mui/x-data-grid';

type BaseTableProps = Omit<
  MUIDataGridProps,
  | 'rowModesModel'
  | 'editMode'
  | 'onRowModesModelChange'
  | 'onRowEditStop'
  | 'processRowUpdate'
  | 'slots'
  | 'slotProps'
>;

export type Data = BaseTableProps['rows'];
export type ColsDef = BaseTableProps['columns'];

export interface Props extends Omit<BaseTableProps, 'rows' | 'checkboxSelection'> {
  rows: Data;
  /** Disable the ability of deleting a row. */
  removable?:
    | boolean
    | {
        /** The ability of deleting a row. */
        single?: boolean;
        /** The ability of deleting multiple rows by checkboxes. */
        multiple?: boolean;
      };
  /** Disable the ability of editing a row. */
  editable?: boolean;
  /** Disable the ability of adding a new record. */
  addable?: boolean;
  onAdd?: (data: Exclude<Data, undefined>[number]) => Promise<boolean> | boolean;
  onRemove?: (id: string | string[]) => Promise<boolean> | boolean;
  onEdit?: (data: Exclude<Data, undefined>[number]) => Promise<boolean> | boolean;
  /** Sort a column. */
  sort?: Exclude<GridSortModel, []>;
  height?: string;
}
