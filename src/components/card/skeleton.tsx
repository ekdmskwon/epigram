import * as S from "./styled";
import * as Sk from "./skeleton.styled";

const CardSkeleton = () => {
  return (
    <S.CardWrapper $fixedSize aria-hidden>
      <S.CardBody $fixedSize>
        <S.CardBackground aria-hidden />
        <S.CardLines aria-hidden />
        <Sk.SkeletonInner>
          <Sk.SkeletonLine $width="92%" />
          <Sk.SkeletonLine $width="78%" />
          <Sk.SkeletonLine $width="60%" />
          <Sk.SkeletonAuthor />
        </Sk.SkeletonInner>
      </S.CardBody>
      <Sk.SkeletonTagRow>
        <Sk.SkeletonTag />
        <Sk.SkeletonTag />
      </Sk.SkeletonTagRow>
    </S.CardWrapper>
  );
};

export default CardSkeleton;
