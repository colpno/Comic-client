import { lazy } from 'react';

export const Table = lazy(() => import('./Table/Table.tsx'));
export const TableActionButton = lazy(() => import('./Table/components/TableActionButton.tsx'));
export { generateTableActionsColDef } from './Table/utils/tableColumnUtils.tsx';
export const Island = lazy(() => import('./Island.tsx'));
export const CheckboxGroup = lazy(() => import('./form-controls/CheckBoxGroup.tsx'));
export const Dialog = lazy(() => import('./Dialog.tsx'));
export const Popup = lazy(() => import('./Popup.tsx'));
export const Pagination = lazy(() => import('./Pagination.tsx'));
export const InfiniteScrollPagination = lazy(() => import('./InfiniteScrollPagination.tsx'));
export const Tabs = lazy(() => import('./Tabs/Tabs.tsx'));
export const Tab = lazy(() => import('./Tab.tsx'));

export { default as Button } from './form-controls/Button.tsx';
export { default as DeviceWatcher } from './DeviceWatcher.tsx';
export { default as TextField } from './form-controls/TextField.tsx';
export { default as Form } from './Form/Form.tsx';
export { default as Image } from './Image.tsx';
export { default as Loading } from './Loading.tsx';
export { default as Logo } from './Logo.tsx';
export { default as Slider } from './Slider/Slider.tsx';
export { default as Toast } from './Toast.tsx';
export { default as Typography } from './Typography.tsx';
export { default as DataFetching } from './DataFetching.tsx';
export { default as AccessTokenRefresher } from './AccessTokenRefresher.tsx';
