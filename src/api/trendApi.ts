import api from "@api/api";

export type User = {
  userId: number;
  nickname: string;
  image: string;
};

export type Tag = {
  color: string;
  type: string;
};

export type Weather = {
  pop: number | null;
  pty: number | null;
  pcp: number | null;
  reh: number | null;
  sno: number | null;
  sky: number | null;
  tmp: number | null;
  tmn: number | null;
  uuu: number | null;
  wav: number | null;
  tmx: number | null;
  wsd: number | null;
  vec: number | null;
  vvv: number | null;
};

export type TrendItem = {
  id: number;
  user: User;
  createAt: string;
  updatedAt: string;
  address: string;
  addressId: number;
  title: string;
  contents: string;
  image: string;
  isPrivate: boolean;
  tags: Tag[];
  weather: Weather;
  boardLikes: number;
  views: number;
  commentCounts: number;
};

export interface TrendQueryParams {
  lastId?: number;
  address?: string;
  color?: string;
  type?: string;
  keyword?: string;
}

// 트렌드 게시물 전체 조회
export const getBoardsTrendItems = async () => {
  try {
    const response = await api.get("/api/boards");
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching trend items:", error);
    throw error;
  }
};
