import { useContext } from 'react';
import { QueryContext } from '@/contexts/router-query.context';

export const useRouterQuery = () => {
  const context = useContext(QueryContext);
  if (!context) throw new Error('useRouterQuery must be used within a LoaderProvider');
  return context;
};
