import { lazy } from 'react';

export const Table = lazy(() => import('./Table/Table.tsx'));
export const Form = lazy(() => import('./Form/Form.tsx'));

export const DraggableWrapper = lazy(() => import('./drag-drop/DraggableWrapper.tsx'));
export const DroppableArea = lazy(() => import('./drag-drop/DroppableArea.tsx'));

export { default as TextField } from './form-controls/TextField.tsx';
export { default as Image } from './Image.tsx';
export { default as Pagination } from './Pagination.tsx';
export { default as Slider } from './Slider/Slider.tsx';
export { default as LinkTabs } from './tabs/LinkTabs.tsx';
export { default as Tab } from './tabs/Tab.tsx';
export { default as Tabs } from './tabs/Tabs.tsx';
export { default as TabsWrapper } from './tabs/TabsWrapper.tsx';
export { default as Toast } from './Toast.tsx';
export { default as Typography } from './Typography.tsx';

export const CheckBoxGroup = lazy(() => import('./form-controls/CheckBoxGroup.tsx'));
export const Button = lazy(() => import('./form-controls/components/Button.tsx'));
export const DatePicker = lazy(() => import('./form-controls/DatePicker.tsx'));
export const DynamicField = lazy(() => import('./form-controls/DynamicField.tsx'));
export const NumberField = lazy(() => import('./form-controls/NumberField.tsx'));
export const RadioGroup = lazy(() => import('./form-controls/RadioGroup.tsx'));
export const Select = lazy(() => import('./form-controls/Select.tsx'));
