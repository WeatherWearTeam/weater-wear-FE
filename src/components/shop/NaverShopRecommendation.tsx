import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  useCreateWishlistItem,
  useDeleteRecommendWishlistItem,
  useDeleteWishlistItem,
} from "@/queries/wishlistQueries";
import LikeButton from "@components/LikeButton";
import { NaverProduct } from "@/api/wishlistApi";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";

interface NaverShopRecommendationProps {
  liked: boolean[];
  toggleLike: (index: number) => void;
  data: NaverProduct[];
}

const NaverShopRecommendation: React.FC<NaverShopRecommendationProps> = ({
  liked,
  toggleLike,
  data,
}) => {
  const [wishlistIds, setWishlistIds] = useState<(number | null)[]>(
    data.map(() => null)
  );
  const { mutateCreateWishlistItem } = useCreateWishlistItem();
  const { mutateDeleteRecommendWishlistItem } =
    useDeleteRecommendWishlistItem();

  const handleLikeClick = (index: number, productId: number) => {
    const updatedLiked = [...liked];
    const updatedWishlistIds = [...wishlistIds];
    updatedLiked[index] = !updatedLiked[index];
    toggleLike(index);

    const item = data[index];

    if (updatedLiked[index]) {
      mutateCreateWishlistItem(item, {
        onSuccess: (response) => {
          console.log("index", index);
          console.log("Item added to wishlist:", response);
          updatedWishlistIds[index] = response.id; // 여기서 추가된 위시리스트 항목의 ID를 저장
          setWishlistIds(updatedWishlistIds);
        },
        onError: (error) => {
          console.error("Error adding item:", error);
        },
      });
    } else {
      console.log("---😎인덱스ㅡㅡindex", index);
      const wishlistId = updatedWishlistIds[index];
      if (wishlistId !== null) {
        mutateDeleteRecommendWishlistItem(productId, {
          onSuccess: () => {
            console.log("Item deleted successfully:", wishlistId);
            // updatedWishlistIds[index] = null;
            setWishlistIds(updatedWishlistIds);
          },
          onError: (error) => {
            console.error("Error deleting item:", error);
          },
        });
      } else {
        console.error("No valid wishlist ID to delete.");
      }
    }
  };

  return (
    <HomeContents5>
      <NaverShopGrid>
        <SwiperContainer>
          <StyledSwiper
            loop={true}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              1200: { slidesPerView: 3, spaceBetween: 20 },
              980: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
            }}
            className="mySwiper"
          >
            {data.map((slide, index) => (
              <SwiperSlide key={slide.productId}>
                <NaverShopImage
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <NaverShopData>
                  <NaverShopDataText>
                    <NaverShopDataType>{slide.type}</NaverShopDataType>
                    <NaverShopDataTitle>{slide.title}</NaverShopDataTitle>
                  </NaverShopDataText>
                  <LikeButton
                    active={liked[index]}
                    onClick={() => handleLikeClick(index, slide.productId)}
                  />
                </NaverShopData>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </SwiperContainer>
        <NaverShopText>
          <HomeTitle>네이버 쇼핑에서 추천해요</HomeTitle>
          <HomeContent>
            요즘 날씨에 맞는 구매하기 좋은 옷을 추천드려요!
            <br />
            저희가 추천드린 옷이 마음에 든다면 하트를 눌러 위시리스트에 저장해
            보세요.
          </HomeContent>
        </NaverShopText>
      </NaverShopGrid>
    </HomeContents5>
  );
};

export default NaverShopRecommendation;

const HomeContents5 = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NaverShopGrid = styled.div`
  justify-content: center;
  display: grid;
  padding: 10px;
  grid-template-columns: 1090px;
  grid-template-rows: 300px auto;
  grid-template-areas:
    "slider"
    "a";
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 840px;
  }

  @media (max-width: 980px) {
    grid-template-columns: 660px;
    grid-template-areas:
      "slider"
      "a";
  }

  @media (max-width: 768px) {
    grid-template-columns: 300px;
    grid-template-rows: auto auto;
    grid-template-areas:
      "slider"
      "a";
  }
`;

const SwiperContainer = styled.div`
  grid-area: slider;
  width: 100%;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    color: black;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const NaverShopImage = styled.div`
  background-color: gray;
  background-size: cover;
  background-position: center;
  height: 240px;
  width: 100%;
`;

const NaverShopData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 12px;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY};
`;

const NaverShopDataText = styled.div`
  background-color: white;
  color: black;
  box-sizing: border-box;
  padding-bottom: 5px;
  justify-content: space-between;
`;

const NaverShopDataType = styled.div`
  font-size: 12px;
  box-sizing: border-box;
`;

const NaverShopDataTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
`;

const NaverShopText = styled.div`
  grid-area: a;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HomeTitle = styled.div`
  font-size: xx-large;
  color: black;
  font-weight: bold;
`;

const HomeContent = styled.div`
  font-size: medium;
`;
