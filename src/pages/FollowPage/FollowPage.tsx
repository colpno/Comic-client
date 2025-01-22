import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import {
  ApiGetFollowsParams,
  useGetFollowsQuery,
  useRemoveFollowMutation,
} from '~/apis/followApis.ts';
import { TextInputProps } from '~/components/form-controls/base-controls/TextInput.tsx';
import { DataFetching, Dialog, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { SortButton, TagFilterButton, TagFilterFormValues } from '~/features/index.ts';
import SearchInput from '~/layouts/components/SearchInput.tsx';
import { ApiSortOrder, Comic, DialogAsConfirm, Follow } from '~/types/index.ts';
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
  const [getFollowsParams, setGetFollowsParams] = useState<ApiGetFollowsParams>(initialParams);
  const { data, isFetching: isApiFetching, isLoading } = useGetFollowsQuery(getFollowsParams);
  const follows = (data?.data as Follow<Comic>[]) || [];
  const [isDataFetching, setIsDataFetching] = useState(isApiFetching);
  const [removeFollow] = useRemoveFollowMutation();
  const [followIdToRemove, setFollowIdToRemove] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const openRemovalPopup = (followId: string) => setFollowIdToRemove(followId);
  const closeRemovalPopup = () => setFollowIdToRemove('');

  // Handle page change
  const handleIntersect = async () => {
    if (follows.length < PER_PAGE) return;
    setGetFollowsParams((prev) => ({
      ...prev,
      _page: prev._page! + 1,
    }));
  };

  const handleRemoveFollow = async () => {
    try {
      await removeFollow(followIdToRemove);
      closeRemovalPopup();
    } catch (error) {}
  };

  const handleSearchChange: TextInputProps['onChange'] = (value) => {
    setIsDataFetching(true);
    if (value) setSearchParams({ title: value });
    else setSearchParams({});
  };

  const handleTagFilterFormSubmit = (values: TagFilterFormValues) => {
    setIsDataFetching(true);
    setGetFollowsParams(({ _embed, ...prev }) => ({
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
      _page: PAGINATION_INITIAL_PAGE,
    }));
  };

  const handleSortOrderChange = (order: ApiSortOrder) => {
    setIsDataFetching(true);
    setGetFollowsParams((prev) => ({
      ...prev,
      _sort: {
        addedAt: order,
      },
      _page: PAGINATION_INITIAL_PAGE,
    }));
  };

  // Handle data fetching state
  useEffect(() => {
    if (isDataFetching && !isApiFetching) setIsDataFetching(false);
  }, [isApiFetching]);
  useEffect(() => {
    if (isLoading) setIsDataFetching(true);
  }, [isLoading]);

  // Handle search params change
  useEffect(() => {
    if (searchParams.has('title')) {
      setGetFollowsParams(({ _embed, ...prev }) => ({
        ...prev,
        _embed: {
          ..._embed!,
          match: {
            title: searchParams.get('title')!,
          },
        },
        _page: PAGINATION_INITIAL_PAGE,
      }));
    } else {
      setGetFollowsParams(({ _embed, ...prev }) => {
        const match = { ..._embed!.match! };
        if (!!match.title) delete match.title;
        return {
          ...prev,
          _embed: {
            ..._embed!,
            match,
          },
          _page: PAGINATION_INITIAL_PAGE,
        };
      });
    }
  }, [searchParams]);

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
        {isDataFetching ? (
          <DataFetching />
        ) : (
          <FollowPageFollowList items={follows} onRemoveClick={openRemovalPopup} />
        )}
        <InfiniteScrollPagination onIntersect={handleIntersect} />
      </Container>
      <RemoveFollowDialog
        open={!!followIdToRemove}
        onAccept={handleRemoveFollow}
        onClose={closeRemovalPopup}
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
