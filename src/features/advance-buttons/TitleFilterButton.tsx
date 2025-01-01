import { Button, Popup, TextField } from '~/components/index.ts';
import { FilterForm } from '~/features/index.ts';
import { usePopup } from '~/hooks/usePopup.ts';
import { ButtonAsButtonProps } from '~/types/formControlTypes.ts';
import { cn } from '~/utils/cssUtils.ts';
import { titleFilterFormSchema, TitleFilterFormValues } from '../forms/validationSchemas.ts';

interface Props extends Partial<Omit<ButtonAsButtonProps, 'onSubmit'>> {
  /** Callback function that will be called when the form is submitted. */
  onSubmit: (values: TitleFilterFormValues) => void;
}

function TitleFilterButton({ onSubmit, ...buttonProps }: Props) {
  const { closePopup, open, openPopup, popupRef } = usePopup();

  return (
    <>
      <Button
        size="small"
        {...buttonProps}
        className={cn('!bg-primary-600', buttonProps.className)}
        onClick={openPopup}
      >
        Title
      </Button>
      <Popup open={open} onClose={closePopup} anchorEl={popupRef}>
        <div className="w-64 p-4 bg-main">
          <FilterForm
            validationSchema={titleFilterFormSchema}
            title="Title"
            onSubmit={onSubmit}
            submitDirtyValuesOnly
          >
            <TextField name="include" label="Include" size="small" variant="standard" fullWidth />
            <TextField name="exclude" label="Exclude" size="small" variant="standard" fullWidth />
          </FilterForm>
        </div>
      </Popup>
    </>
  );
}

export default TitleFilterButton;
export { type TitleFilterFormValues };
