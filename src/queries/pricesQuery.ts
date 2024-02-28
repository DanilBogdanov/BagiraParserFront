import { getBagiraGoods, getGoodMenu } from '@/api/pricesApi';
import { QueryKeys } from '@/types';
import { BagiraGoodRequest } from '@/types/prices';
import { useQuery } from '@tanstack/react-query';

const STALE_TIME = 1000 * 60 * 10;

export const useGoodMenuQuery = () =>
  useQuery({
    queryKey: [QueryKeys.BagiraGoods, QueryKeys.BagiraMenu],
    queryFn: getGoodMenu,
    staleTime: STALE_TIME,
  });

export const useBagiraGoodQuery = (request: BagiraGoodRequest) =>
  useQuery({
    queryKey: [QueryKeys.BagiraGoods, JSON.stringify(request)],
    queryFn: () => getBagiraGoods(request),
    staleTime: STALE_TIME,
  });
