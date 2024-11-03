import { AnyObject, Query } from '@/types';
import qs, { IStringifyOptions, ParsedQs } from 'qs';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const queryStringifyOptions: IStringifyOptions = {
  encode: false,
  arrayFormat: 'comma',
  indices: false,
};

type QueryProviderProps = {
  children: ReactNode;
};

export type Sort = Record<string, SortOrder>;
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
export type QueryParamType = string | string[] | number | AnyObject;

type QueryContextType = {
  query: Query;
  setQueryParam: (key: string, value: QueryParamType) => void;
  setSort: (sort: Sort) => void;
  removeQuery: (key: string) => void;
  resetQuery: () => void;
};

export const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [query, setQuery] = useState<Query>({});
  const { pathname: basePath, search: uriParamStr } = useLocation();
  const navigate = useNavigate();

  // Set query params
  const setQueryParam = (key: string, value: QueryParamType) => {
    setQuery((prev) => {
      return { ...prev, [key]: value };
    });
  };

  // Set sort query
  const setSort = (sort: Sort) => {
    setQueryParam('sort', sort);
  };

  // Remove specific query param
  const removeQuery = (key: string) => {
    setQuery((prev) => {
      delete (prev as ParsedQs)[key];
      return { ...prev };
    });
  };

  // Reset query
  const resetQuery = () => {
    setQuery({});
    navigate(basePath, { replace: true });
  };

  const value = {
    query,
    setQueryParam,
    setSort,
    removeQuery,
    resetQuery,
  };

  // Set initial query from the url
  useEffect(() => {
    setQuery(qs.parse(uriParamStr));
  }, []);

  // Update url when query changes
  useEffect(() => {
    const queryString = qs.stringify(query, queryStringifyOptions);
    navigate(`${basePath}${queryString ? `?${queryString}` : ''}`, { replace: true });
  }, [query]);

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};
