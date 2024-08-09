import React from "react";
import { useTrendItems } from "@queries/trendQueries";
import styled from "styled-components";
import ClothesItem from "@components/trend/TrendItem";

const TrendGrid: React.FC = () => {
  const { trendItemsData, isPending, isError } = useTrendItems({
    address: "서울특별시",
    color: "BLUE",
    type: "DRESS",
    keyword: "맑음",
  });

  // console.log("Trend Items Data:", trendItemsData);
  // console.log(post);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading data...</div>;
  if (!trendItemsData || trendItemsData.length === 0)
    return <div>No items found</div>;

  return (
    <ContentsMain>
      {trendItemsData.map((post) => (
        <ClothesItem key={post.id} {...post} />
      ))}
    </ContentsMain>
  );
};

export default TrendGrid;

const ContentsMain = styled.div`
  width: 85%;
  max-width: 1090px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 40px 30px;
  padding: 20px 0 15px 0;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 2fr);
  }
  // @media (max-width: 900px) {grid-template-columns: repeat(2, 2fr);}
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
