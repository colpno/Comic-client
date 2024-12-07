import { matchPath, useLocation } from 'react-router-dom';

interface Options {
  /** Match pathname including params. */
  exact?: boolean;
}

export const useRouteMatch = (patterns: readonly string[], options?: Options) => {
  const { pathname, search } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];

    if (options?.exact && pattern === pathname + search) {
      return pattern;
    } else {
      const possibleMatch = matchPath(pattern, pathname);
      if (possibleMatch !== null) {
        return possibleMatch.pattern.path;
      }
    }
  }

  return null;
};
