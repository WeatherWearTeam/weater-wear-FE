import { useEffect, useState } from "react";
import styled from "styled-components";
import PageMoveButton from "@components/PageMoveButton";
import WishsGrid from "@components/wish/WishsGrid";
import useModal from "@hooks/useModal";
import ModalPortal from "@components/Modal/ModalPortal";
import ModalLayout from "@components/Modal/ModalLayout";
import WishDetail from "@pages/WishDetail";
import {
  useWishlistItems,
  useDeleteWishlistItem,
  useWishlistItem,
} from "@/queries/wishlistQueries";

function Wish() {
  const { isVisible, openModal, closeModal } = useModal();
  const [page, setPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);

  const { wishlistItems, isPending, isError, isSuccess } = useWishlistItems(
    page,
    type
  );
  const { mutateDeleteWishlistItem } = useDeleteWishlistItem();
  console.log(wishlistItems);

  const handleDelete = (productId: number) => {
    mutateDeleteWishlistItem(productId);
  };

  const handleItemClick = (id: number) => {
    setSelectedItemId(id);
    openModal();
  };

  const selectedItem = wishlistItems?.content?.find(
    (item) => item.id === selectedItemId
  );

  if (isPending) return <div>Loading...</div>;
  if (isError)
    return (
      <div>위시리스트를 불러오지 못했습니다. 위시리스트를 추가해주세요.</div>
    );
  if (wishlistItems)
    return (
      <MypageContentsContainer>
        <ContentsHeader>{/* <ClothesTypes /> */}</ContentsHeader>
        <ContentsMain>
          <WishsGrid
            onClick={handleItemClick}
            data={wishlistItems.content}
            onDelete={handleDelete}
          />
        </ContentsMain>
        <ContentsFooter>
          <PageMoveButton
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
          {isVisible && (
            <ModalPortal>
              <ModalLayout onClose={closeModal}>
                <WishDetail item={selectedItem!} />
              </ModalLayout>
            </ModalPortal>
          )}
        </ContentsFooter>
      </MypageContentsContainer>
    );
}

export default Wish;

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

const ContentsHeader = styled.div`
  background-color: white;
  width: 100%;
  height: 60px;
  max-width: 1090px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
`;

const ContentsMain = styled.div`
  width: 85%;
  max-width: 1090px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 30px;
  padding: 20px 0 15px 0;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 2fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ContentsFooter = styled.div`
  margin-top: auto;
  margin-bottom: 5rem;
`;
