import {
  getParserBrands,
  getParserCompanies,
  getParserGoods,
  setLinkToBagira,
} from '@/api/competitorsApi';
import { getBagiraGoodNames } from '@/api/competitorsApi';
import { QueryKeys } from '@/types';
import { ParserGood, ParserGoodRequest } from '@/types/competitors';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const useCompaniesQuery = () =>
  useQuery({
    queryKey: [QueryKeys.ParserCompanies],
    queryFn: getParserCompanies,
    staleTime: STALE_TIME,
  });

export const useParserBrandsQuery = (companyId: number) =>
  useQuery({
    queryKey: [QueryKeys.ParserBrands, companyId],
    queryFn: () => getParserBrands(companyId),
    staleTime: STALE_TIME,
  });

export const useParserGoodsQuery = (request: ParserGoodRequest) =>
  useQuery({
    queryKey: [QueryKeys.ParserGoods, JSON.stringify(request)],
    queryFn: () => getParserGoods(request),
    staleTime: STALE_TIME,
  });

export const useBagiraGoodNamesQuery = () =>
  useQuery({
    queryKey: [QueryKeys.BagiraGoodNames],
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
        queryKey: [QueryKeys.ParserGoods],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BagiraGoods],
      });
    },
  });
};
