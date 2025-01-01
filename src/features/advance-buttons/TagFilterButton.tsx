import { faker } from '@faker-js/faker';

import { Button, ButtonAsButtonProps, Popup } from '~/components/index.ts';
import { SelectiveFilterForm, SelectiveFilterFormValues } from '~/features/index.ts';
import { usePopup } from '~/hooks/usePopup.ts';
import { cn } from '~/utils/cssUtils.ts';

interface Props extends Partial<Omit<ButtonAsButtonProps, 'onSubmit'>> {
  /** Callback function that will be called when the form is submitted. */
  onSubmit: (values: SelectiveFilterFormValues) => void;
}

const tags = Array.from({ length: 20 }, () => ({
  label: faker.lorem.word(),
  value: faker.lorem.word(),
}));

function TagFilterButton({ onSubmit, ...buttonProps }: Props) {
  const { closePopup, open, openPopup, popupRef } = usePopup();

  return (
    <>
      <Button
        size="small"
        {...buttonProps}
        className={cn('!bg-primary-600', buttonProps.className)}
        onClick={openPopup}
      >
        Tags
      </Button>
      <Popup open={open} onClose={closePopup} anchorEl={popupRef}>
        <div className="w-64 p-4 bg-main">
          <SelectiveFilterForm
            title="Tags"
            onSubmit={onSubmit}
            options={tags}
            submitDirtyValuesOnly
          />
        </div>
      </Popup>
    </>
  );
}

export default TagFilterButton;
export { type SelectiveFilterFormValues as TagFilterFormValues };
