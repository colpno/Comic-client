import { lazy } from 'react';

export const Table = lazy(() => import('./Table/Table.tsx'));

export const DraggableWrapper = lazy(() => import('./DraggableWrapper.tsx'));
export const DroppableWrapper = lazy(() => import('./DroppableWrapper.tsx'));

export const CheckBoxGroup = lazy(() => import('./form-controls/CheckBoxGroup.tsx'));
export const Button = lazy(() => import('./form-controls/Button.tsx'));
export const DatePicker = lazy(() => import('./form-controls/DatePicker.tsx'));
export const DynamicField = lazy(() => import('./form-controls/DynamicField.tsx'));
export const NumberField = lazy(() => import('./form-controls/NumberField.tsx'));
export const RadioGroup = lazy(() => import('./form-controls/RadioGroup.tsx'));
export const Select = lazy(() => import('./form-controls/Select.tsx'));

export { default as TextField } from './form-controls/TextField.tsx';

export { default as Tab } from './Tab.tsx';
export { default as Tabs } from './Tabs/Tabs.tsx';

export { default as ComicSlider } from './sliders/ComicSlider.tsx';
export { default as Slider } from './sliders/Slider.tsx';

export { default as Form } from './Form/Form.tsx';
export { default as Image } from './Image.tsx';
export { default as Loading } from './Loading.tsx';
export { default as Logo } from './Logo.tsx';
export { default as Pagination } from './Pagination.tsx';
export { default as Toast } from './Toast.tsx';
export { default as Typography } from './Typography.tsx';
