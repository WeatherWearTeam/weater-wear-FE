import { useQuery } from "@tanstack/react-query";
import { getBoardsTrendItems, TrendQueryParams } from "@api/trendApi";

// 트렌드 게시물 조회
export const useTrendItems = (params: TrendQueryParams) => {
  const {
    data: trendItemsData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["trendItems", params],
    queryFn: () => getBoardsTrendItems(params),
  });

  return { trendItemsData, isPending, isError, isSuccess };
};
