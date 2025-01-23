import { Container } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLazyGetFollowsQuery, useRemoveFollowMutation } from '~/apis/followApis.ts';
import { TextInputProps } from '~/components/form-controls/base-controls/TextInput.tsx';
import { DataFetching, Dialog, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { SortButton, TagFilterButton, TagFilterFormValues } from '~/features/index.ts';
import useInfinitePagination from '~/hooks/useInfinitePagination.ts';
import SearchInput from '~/layouts/components/SearchInput.tsx';
import {
  ApiGetFollowsParams,
  ApiSortOrder,
  Comic,
  DialogAsConfirm,
  Follow,
} from '~/types/index.ts';
import NotFoundPage from '../ErrorPage/components/NotFoundPage.tsx';
import FollowPageFollowList from './components/FollowPageFollowList';

const PER_PAGE = 30;

const initialParams: ApiGetFollowsParams = {
  _embed: {
    path: 'following',
    populate: 'cover_art',
  },
  _limit: PER_PAGE,
  _page: PAGINATION_INITIAL_PAGE,
  _sort: {
    addedAt: 'desc',
  },
};

function FollowPage() {
  const [getFollows, { isFetching, isLoading, isError }] = useLazyGetFollowsQuery();
  const {
    data: follows,
    setParams,
    handleIntersect,
  } = useInfinitePagination([], initialParams, getFollows);
  const isFetchingOrLoading = isFetching || isLoading;
  const [followIdToRemove, setFollowIdToRemove] = useState('');
  const [remove] = useRemoveFollowMutation();

  /**
   * @param followId Don't pass this parameter to close the popup
   */
  const toggleRemovalPopup = (followId?: string) => {
    setFollowIdToRemove(followId ?? '');
  };

  const handleFollowRemoval = async () => {
    try {
      await remove(followIdToRemove);
      toggleRemovalPopup();
    } catch (error) {}
  };

  const handleSearchChange: TextInputProps['onChange'] = (value) => {
    setParams(({ _embed, _page, ...prev }) => {
      const { title, ...match } = _embed!.match!;
      const hasSearched = !!value;
      return {
        ...prev,
        _embed: {
          ..._embed!,
          match: hasSearched ? { title: value } : match,
        },
      };
    });
  };

  const handleTagFilterFormSubmit = (values: TagFilterFormValues) => {
    setParams(({ _embed, _page, ...prev }) => ({
      ...prev,
      _embed: {
        ..._embed!,
        match: {
          includedTags: values.includedOptions,
          includedTagsMode: 'AND',
          excludedTags: values.excludedOptions,
          excludedTagsMode: 'AND',
        },
      },
    }));
  };

  const handleSortOrderChange = (order: ApiSortOrder) => {
    setParams(({ _page, ...prev }) => ({
      ...prev,
      _sort: {
        addedAt: order,
      },
    }));
  };

  if (isError) {
    return <NotFoundPage title="No comics found" />;
  }

  return (
    <>
      <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} className="pt-12">
        {follows.length > 0 && (
          <div className="flex flex-row items-end mb-4 sm:justify-between">
            <div className="flex gap-1.5">
              <TagFilterButton onSubmit={handleTagFilterFormSubmit} />
            </div>
            <SearchInput
              name="title"
              label="Search"
              fullWidth={false}
              onSubmit={handleSearchChange}
            />
            <SortButton
              defaultValue="desc"
              onChange={handleSortOrderChange}
              className="!ml-2 sm:!ml-0"
            />
          </div>
        )}
        {isFetchingOrLoading ? (
          <DataFetching />
        ) : typeof follows[0] !== 'string' ? (
          <>
            <FollowPageFollowList
              items={follows as Follow<Comic>[]}
              onRemoveClick={toggleRemovalPopup}
            />
            <InfiniteScrollPagination onIntersect={handleIntersect} />
          </>
        ) : (
          <NotFoundPage title="Follow list is empty" />
        )}
      </Container>
      <RemoveFollowDialog
        open={!!followIdToRemove}
        onAccept={handleFollowRemoval}
        onClose={toggleRemovalPopup}
      />
      <Helmet>
        <title>Following - Comic</title>
      </Helmet>
    </>
  );
}

function RemoveFollowDialog(props: Omit<DialogAsConfirm, 'title'>) {
  return (
    <Dialog maxWidth="xs" fullWidth {...props} variant="confirm" title="Remove Follow">
      Are you sure to remove this follow?
    </Dialog>
  );
}

export default FollowPage;
