import { DataGridProps as MUIDataGridProps, GridSortModel } from '@mui/x-data-grid';

type DataGridProps = Omit<
  MUIDataGridProps,
  | 'rowModesModel'
  | 'editMode'
  | 'onRowModesModelChange'
  | 'onRowEditStop'
  | 'processRowUpdate'
  | 'slots'
  | 'slotProps'
>;

export interface TableProps extends DataGridProps {
  /** Disable the ability of deleting rows individually. */
  disableDelete?: boolean;
  /** Disable the ability of editing rows. */
  disableEdit?: boolean;
  /** Disable the ability of adding a new record. */
  disableAdd?: boolean;
  /** Sort a column. */
  sort?: Exclude<GridSortModel, []>;
}
