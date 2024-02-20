import {
  getParserBrands,
  getParserCompanies,
  getParserGoods,
  setLinkToBagira,
} from '@/api/competitorsApi';
import { getBagiraGoodNames } from '@/api/goodsApi';
import { ParserGood, ParserGoodRequest } from '@/types/competitors';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const useCompaniesQuery = () =>
  useQuery({
    queryKey: ['parser-companies'],
    queryFn: getParserCompanies,
    staleTime: STALE_TIME,
  });

export const useParserBrandsQuery = (companyId: number) =>
  useQuery({
    queryKey: ['parser-brands', companyId],
    queryFn: () => getParserBrands(companyId),
    staleTime: STALE_TIME,
  });

export const useParserGoodsQuery = (request: ParserGoodRequest) =>
  useQuery({
    queryKey: ['parser-goods', JSON.stringify(request)],
    queryFn: () => getParserGoods(request),
    staleTime: STALE_TIME,
  });

export const useBagiraGoodNamesQuery = () =>
  useQuery({
    queryKey: ['bagira-good-names'],
    queryFn: getBagiraGoodNames,
    staleTime: STALE_TIME,
  });

export const useSetLinkToBagiraMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      parserGood,
      goodId,
    }: {
      parserGood: ParserGood;
      goodId: number | null;
    }) => setLinkToBagira(parserGood, goodId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['parser-goods'],
      });
    },
  });
};
