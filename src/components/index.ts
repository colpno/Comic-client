import { lazy } from 'react';

export const Table = lazy(() => import('./Table/Table.tsx'));
export { default as TableActionButton } from './Table/components/TableActionButton.tsx';
export { generateTableActionsColDef } from './Table/utils/tableColumnUtils.tsx';
export const Island = lazy(() => import('./Island.tsx'));
export const CheckboxGroup = lazy(() => import('./form-controls/CheckBoxGroup.tsx'));
export const RadioGroup = lazy(() => import('./form-controls/RadioGroup.tsx'));
export const Select = lazy(() => import('./form-controls/Select.tsx'));
export const Dialog = lazy(() => import('./Dialog.tsx'));
export const Popup = lazy(() => import('./Popup.tsx'));
export const InfiniteScrollPagination = lazy(() => import('./InfiniteScrollPagination.tsx'));

export { default as Button } from './form-controls/Button.tsx';
export { default as DeviceWatcher } from './DeviceWatcher.tsx';
export { default as TextField } from './form-controls/TextField.tsx';
export { default as Form } from './Form/Form.tsx';
export { default as Image } from './Image.tsx';
export { default as Loading } from './Loading.tsx';
export { default as Logo } from './Logo.tsx';
export { default as Pagination } from './Pagination.tsx';
export { default as Slider } from './Slider/Slider.tsx';
export { default as Tab } from './Tab.tsx';
export { default as Tabs } from './Tabs/Tabs.tsx';
export { default as Toast } from './Toast.tsx';
export { default as Typography } from './Typography.tsx';
export { default as DataFetching } from './DataFetching.tsx';
export { default as AccessTokenRefresher } from './AccessTokenRefresher.tsx';
