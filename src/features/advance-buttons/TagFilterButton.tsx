import { useMemo } from 'react';

import { useGetGenresQuery } from '~/apis/genreApis.ts';
import { Button, ButtonAsButtonProps, Popup } from '~/components/index.ts';
import { SelectiveFilterForm, SelectiveFilterFormValues } from '~/features/index.ts';
import { usePopup } from '~/hooks/usePopup.ts';
import { cn } from '~/utils/cssUtils.ts';

interface Props extends Partial<Omit<ButtonAsButtonProps, 'onSubmit'>> {
  /** Callback function that will be called when the form is submitted. */
  onSubmit: (values: SelectiveFilterFormValues) => void;
}

function TagFilterButton({ onSubmit, ...buttonProps }: Props) {
  const { closePopup, open, openPopup, popupRef } = usePopup();
  const { data: genres, isFetching } = useGetGenresQuery();

  const tags = useMemo(
    () =>
      genres
        ?.map(({ name }) => name)
        .sort()
        .map((g) => ({
          label: g,
          value: g,
        })) || [],
    [genres]
  );

  return (
    <>
      <Button
        size="small"
        {...buttonProps}
        className={cn('!bg-primary-600', buttonProps.className)}
        onClick={openPopup}
        loading={isFetching}
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
