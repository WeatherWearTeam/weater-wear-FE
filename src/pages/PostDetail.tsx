import { getTimesAgo } from "@utils/getTime";
import { getSkyState } from "@utils/getWeather";
import Comments from "@components/Comment/Comments";
import EditIcon from "@components/EditIcon";
import Icon from "@components/Icon";
import { useBoardById, useDeleteBoard } from "@queries/boardQueries";
import {
  atIcon,
  eyeIcon,
  eyeOffIcon,
  heartFillIcon,
  heartIcon,
  weatherSunIcon,
} from "@shared/icons";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditDeleteButton from "@components/EditDeleteButton";
import ClothesTag from "@components/ClothesTag";

export default function PostDetail() {
  //❌ 좋아요 기능 아직 구현 안함 ->  근우님꺼 가져다 쓰기 ㅇㅇ
  const isClickedLike = false;

  //////////////////////////////////////////////////////////////////
  const { id: boardId } = useParams(); //현재 Board id url에서 가져오기

  const { board, isPending, isError, isSuccess } = useBoardById(
    Number(boardId)
  );
  //🌈 isPending, isError, isSuccess 값 사용해서 UX 개선하기

  console.log(board);

  const { mutateDeleteBoard } = useDeleteBoard();
  return (
    <Container>
      <TitleContainer>
        {/* <Title>나의 OOTD</Title> */}
        <SubTitle>OOTD</SubTitle>
      </TitleContainer>
      <GridContainer>
        <Column>
          <ImageWrapper>
            <img src={board?.boardImage.image} alt="ootd 사진" />
            {/* 이미지 로드 실패 시 예외 처리 필요 */}
          </ImageWrapper>
          {/*  */}
          <FlexRowIconContainer>
            {!board?.isPrivate ? (
              <Icon icon={eyeIcon} />
            ) : (
              <Icon icon={eyeOffIcon} />
            )}
            <span>조회수 10</span>
            {isClickedLike ? (
              <Icon icon={heartFillIcon} />
            ) : (
              <Icon icon={heartIcon} />
            )}
            <span>좋아요 {board?.boardLikes.likeSub}</span>
          </FlexRowIconContainer>
          {/*  */}
        </Column>

        <Column>
          {/*  */}
          <ContentContainer>
            {/*  */}
            <FlexColumn>
              {/*  */}
              <FlexRow>
                <FlexRowUser>
                  <UserImage>
                    <AvatarImg src={board?.user.image} />
                  </UserImage>
                  <FlexColumnUser>
                    <FlexRowUser>
                      <UserInfoText>
                        {board?.user.nickname} ·{" "}
                        {getTimesAgo(board?.createdAt as string)}
                      </UserInfoText>
                    </FlexRowUser>
                    {board?.weather && (
                      <WeatherInfo>
                        <Location>
                          <Icon icon={atIcon} />
                          <span>{board?.weather.stn}</span>
                        </Location>
                        <span>{board?.weather.ta}°C </span>
                        <span>{getSkyState(board?.weather?.sky)}</span>
                      </WeatherInfo>
                    )}
                  </FlexColumnUser>
                </FlexRowUser>
                <IconWrapper>
                  <Icon icon={weatherSunIcon} />
                </IconWrapper>
              </FlexRow>
              {/*  */}
              {/*  */}
              <FlexColumn>
                <ContentTitle>{board?.title}</ContentTitle>
                <ContentText>{board?.contents}</ContentText>
              </FlexColumn>
              {/*  */}
            </FlexColumn>
            {/*  */}
            <FlexRow>
              <ClothesTagWrapper>
                {board?.boardTags.map((tag) => (
                  <ClothesTag key={tag.id} color={tag.color} type={tag.type} />
                ))}
              </ClothesTagWrapper>
              <EditDeleteButton
                id={Number(boardId)}
                editPath={`/ootd/${boardId}/edit`}
                onMutateDelete={mutateDeleteBoard}
              />
              {/* 여기는 navigate 하는 함수 보내기 */}
            </FlexRow>
            {/*  */}
          </ContentContainer>
          {/*  */}
        </Column>

        <FullWidthColumn>
          {/*  */}
          <CommentWrapper>
            {/* <Comments
              //임시로 json-server 특성상 쿼리 불가 해서 프롭 드릴링 ㄱㄱ
              userId={board?.user.userId as number}
              image={board?.user.image as string}
              nickname={board?.user?.nickname as string}
              comments={board?.comments}
              boardId={board?.id as number}
            /> */}
          </CommentWrapper>
          {/*  */}
        </FullWidthColumn>
      </GridContainer>
    </Container>
  );
}

//✅ 상단 글 부분
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: ${({ theme }) => theme.borders.containerBorder};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 레이아웃 요소
const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  border: ${({ theme }) => theme.borders.containerBorder};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  gap: 2rem;
`;

//유저
const UserImage = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.GRAY};
`;

const AvatarImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

const FlexColumnUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRowUser = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const UserInfoText = styled.div`
  font-size: small;
`;

const WeatherInfo = styled.div`
  font-size: x-small;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Location = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.YELLOW};
`;

//글 박스 안
const ContentTitle = styled.div`
  font-size: large;
  font-weight: 600;
`;

const ContentText = styled.div`
  font-size: small;
`;

//마지막
const ClothesTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const FlexRowIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem 0;
  span {
    font-size: small;
  }
`;

//✅ 댓글 부분

const CommentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

//✅ 화면 전체 레이아웃

const Container = styled.div`
  height: calc(100vh - 7rem);
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem 4rem 4rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK};
  margin-bottom: 2rem;
  gap: 1rem;
`;

// const Title = styled.div`
//   font-size: x-large;
// `;

const SubTitle = styled.div`
  font-size: large;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 3fr; /* 2:3 비율의 컬럼 */
  grid-template-rows: auto auto; /* 행의 높이는 콘텐츠에 맞게 자동 조정 */
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto;
    //행의 높이 자동 조정
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 단일 컬럼으로 변경 */
    grid-template-rows: repeat(3, auto);
    //모든 아이템이 세로로 쌓이도록 설정
  }
`;

const Column = styled.div`
  padding: 1rem 0;
  /* border: 1px solid blue; */
`;

const FullWidthColumn = styled.div`
  /* border: 1px solid blue; */
  grid-column: 1 / span 2; /* 두 번째 행 전체를 차지 */

  @media (max-width: 900px) {
    grid-column: 1 / span 2; /* 모바일 화면에서 두 번째 행 전체를 차지하도록 설정 */
  }

  @media (max-width: 600px) {
    grid-column: auto; /* 모든 화면에서 정상적으로 작동하도록 기본값으로 설정 */
  }
`;
