import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  ApiGetFollowParams,
  useLazyGetFollowsQuery,
  useRemoveFollowMutation,
} from '~/apis/followApis.ts';
import { TextInputProps } from '~/components/form-controls/base-controls/TextInput.tsx';
import { DataFetching, Dialog, InfiniteScrollPagination } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH, PAGINATION_INITIAL_PAGE } from '~/constants/commonConstants.ts';
import { SortButton, TagFilterButton, TagFilterFormValues } from '~/features/index.ts';
import SearchInput from '~/layouts/components/SearchInput.tsx';
import { SortOrder } from '~/types/apiTypes.ts';
import { Comic } from '~/types/comicType.ts';
import { Follow } from '~/types/followType.ts';
import FollowPageFollowList from './components/FollowPageFollowList';

const PER_PAGE = 30;

function FollowPage() {
  const [getFollows, { isFetching: isApiFetching }] = useLazyGetFollowsQuery();
  const [isDataFetching, setIsDataFetching] = useState(isApiFetching);
  const [follows, setFollows] = useState<Follow<Comic>[]>([]);
  const [getFollowsParams, setGetFollowsParams] = useState<ApiGetFollowParams>({
    _embed: {
      path: 'following',
      populate: 'cover_art',
    },
    _limit: PER_PAGE,
    _page: PAGINATION_INITIAL_PAGE,
    _sort: {
      addedAt: 'desc',
    },
  });
  const [followIdToRemove, setFollowIdToRemove] = useState('');
  const [removeFollow] = useRemoveFollowMutation();

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

    if (value) {
      setGetFollowsParams(({ _embed, ...prev }) => ({
        ...prev,
        _embed: {
          ..._embed!,
          match: {
            title: value,
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

  const handleSortOrderChange = (order: SortOrder) => {
    setIsDataFetching(true);

    setGetFollowsParams((prev) => ({
      ...prev,
      _sort: {
        addedAt: order,
      },
      _page: PAGINATION_INITIAL_PAGE,
    }));
  };

  // Fetch follows
  useEffect(() => {
    (async () => {
      const data = (await getFollows(getFollowsParams).unwrap()) as Follow<Comic>[];

      if (getFollowsParams._page === PAGINATION_INITIAL_PAGE) {
        setFollows(data);
      } else {
        setFollows((prev) => [...prev, ...data]);
      }
    })();
  }, [getFollowsParams]);

  // Handle data fetching state
  useEffect(() => {
    if (isDataFetching && !isApiFetching) setIsDataFetching(false);
  }, [isApiFetching]);

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
      <Dialog
        open={!!followIdToRemove}
        onAccept={handleRemoveFollow}
        onClose={closeRemovalPopup}
        title="Remove Follow"
        maxWidth="xs"
        fullWidth
      >
        Are you sure to remove this follow?
      </Dialog>
      <Helmet>
        <title>Following - Comic</title>
      </Helmet>
    </>
  );
}

export default FollowPage;
