import React from "react";
import styled from "styled-components";
import Icon from "@components/Icon";
import {
  atIcon,
  celsiusIcon,
  chatIcon,
  eyeIcon,
  hashtagIcon,
  heartIcon,
} from "@shared/icons";

interface ClothesItemProps {
  id: number;
  title: string;
  contents: string;
  address: string;
  weather: {
    tmp: number | null;
    sky: number | null;
  };
  tags: {
    color: string;
    type: string;
  }[];
  views: number;
  boardLikes: number;
  commentCounts: number;
  image: string;
}

const ClothesItem: React.FC<ClothesItemProps> = ({
  title,
  contents,
  address,
  weather,
  tags,
  views,
  boardLikes,
  commentCounts,
  image,
}) => {
  return (
    <ContentsItem>
      <ContentsItemImage style={{ backgroundImage: `url(${image})` }} />
      <ContentsItemData>
        <ViewContainer>
          <ViewEye>
            <Icon icon={eyeIcon} /> {views}
          </ViewEye>
          <ViewHeart>
            <Icon icon={heartIcon} /> {boardLikes}
          </ViewHeart>
          <ViewChat>
            <Icon icon={chatIcon} /> {commentCounts}
          </ViewChat>
        </ViewContainer>
        <AreaWeatherContainer>
          <Icon icon={atIcon} />
          {address} {weather.tmp}
          <Icon icon={celsiusIcon} />
          {weather.sky === 1 ? "맑음" : "흐림"}
        </AreaWeatherContainer>
      </ContentsItemData>
      <ContentsItemTitle>{title}</ContentsItemTitle>
      <ContentsItemTagData>
        {tags.map((tag, index) => (
          <HashtagWrapper key={index}>
            <Icon icon={hashtagIcon} />
            {tag.color} {tag.type}
          </HashtagWrapper>
        ))}
      </ContentsItemTagData>
    </ContentsItem>
  );
};

export default ClothesItem;

const ContentsItem = styled.div`
  width: 250px;
  height: 320px;
  box-sizing: border-box;
`;

const ContentsItemImage = styled.div`
  background-color: gray;
  width: 250px;
  height: 270px;
  box-sizing: border-box;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ContentsItemData = styled.div`
  width: 250px;
  height: 25px;
  font-size: small;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const ViewEye = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  }
`;

const ViewHeart = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  }
`;

const ViewChat = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  }
`;

const AreaWeatherContainer = styled.div`
  margin-left: auto;
  display: flex;

  svg {
    width: 15px;
    height: 15px;
  }
`;

const ContentsItemTagData = styled.div`
  display: flex;
  width: 250px;
  height: 25px;
  font-size: 10px;
  box-sizing: border-box;
  gap: 10px;
`;

const HashtagWrapper = styled.div`
  display: flex;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const ContentsItemTitle = styled.div`
  background-color: white;
  color: black;
  width: 250px;
  height: 25px;
  font-size: medium;
  font-weight: bold;
  box-sizing: border-box;
  margin: 1rem 0em 0rem;
`;
