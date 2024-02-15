import {
  createParserPage,
  deleteParserPage,
  getParserPages,
  setParserPageStatus,
  updateParserPage,
} from '@/api/parserPagesApi';
import { ParserPage } from '@/types/competitors';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const usePagesQuery = (companyId: number) =>
  useQuery({
    queryKey: ['parser-pages', companyId],
    enabled: !!companyId,
    staleTime: STALE_TIME,
    queryFn: () => getParserPages(companyId),
  });

export const useCreatePageMutation = (companyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (parserPage: ParserPage) => createParserPage(parserPage),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parser-pages', companyId],
      });
    },
  });
};

export const useUpdatePageMutation = (companyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (parserPage: ParserPage) => updateParserPage(parserPage),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parser-pages', companyId],
      });
    },
  });
};

export const useStatusPageMutation = (companyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      parserCompanyId,
      pageId,
      isActive,
    }: {
      parserCompanyId: number;
      pageId: number;
      isActive: boolean;
    }) => setParserPageStatus(parserCompanyId, pageId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parser-pages', companyId],
      });
    },
  });
};

export const useDeletePageMutation = (companyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (parserPage: ParserPage) =>
      deleteParserPage(parserPage.parserCompanyId, parserPage.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parser-pages', companyId],
      });
    },
  });
};
