import React from "react";
import styled from "styled-components";
import AddButton from "@components/AddButton";
import Icon from "@components/Icon";
import { fundsBoxIcon } from "@shared/icons";
import TrendGrid from "@components/trend/TrendGrid";
import { useNavigate } from "react-router-dom";
import Search from "@components/Search";

function Trend() {
  const navigate = useNavigate();
  return (
    <>
      <TrendHeader>
        <MainTitleContainer>
          <MainTitleTop>
            OOTD
            <Icon icon={fundsBoxIcon} />
          </MainTitleTop>
          <TrendSearch>
            <SearchWrapper>
              <Search />
            </SearchWrapper>
          </TrendSearch>
        </MainTitleContainer>
      </TrendHeader>
      <MypageContentsContainer>
        <TrendGrid />
        <ContentsFooter>
          <MoreButtonWrapper>
            <MoreButton>더보기</MoreButton>
          </MoreButtonWrapper>
          <AddButton onClick={() => navigate(`/ootd/add`)} />
        </ContentsFooter>
      </MypageContentsContainer>
    </>
  );
}

export default Trend;

const TrendHeader = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
`;

const MainTitleContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainTitleTop = styled.div`
  color: black;
  text-align: left;
  margin: 0;
  padding: 0 20px;
  font-size: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 27px;
    height: 27px;
  }
`;

const TrendSearch = styled.div`
  font-size: 24px;
`;

const MypageContentsContainer = styled.div`
  width: 100%;
  height: 80vh;
  position: fixed;
  top: 175px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  overflow-y: auto;
`;

const ContentsFooter = styled.div`
  width: 85%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  max-width: 1220px;
  flex-shrink: 0;
`;

const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MoreButton = styled.button`
  width: 130px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a3a3a3;
  border: none;
  color: black;

  &:hover {
    ${({ theme, $buttonType = "primary" }) => theme.buttons[$buttonType].hover};
  }
  &:focus {
    ${({ theme, $buttonType = "primary" }) => theme.buttons[$buttonType].focus};
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 300px;
  padding-left: 20px;
`;
