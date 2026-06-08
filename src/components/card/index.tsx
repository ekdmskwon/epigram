import type { CardProps } from "./type";
import * as S from "./styled";

const Card = ({
  content,
  author,
  tags = [],
  fixedSize = false,
  animationIndex,
}: CardProps) => {
  return (
    <S.CardWrapper $fixedSize={fixedSize} $animationIndex={animationIndex}>
      <S.CardBody $fixedSize={fixedSize}>
        <S.CardBackground aria-hidden />
        <S.CardLines aria-hidden />
        <S.CardInner $fixedSize={fixedSize}>
          <S.Content $fixedSize={fixedSize}>{content}</S.Content>
          <S.Author>- {author} -</S.Author>
        </S.CardInner>
      </S.CardBody>
      {tags.length > 0 && (
        <S.TagList>
          {tags.map((tag) => (
            <S.Tag key={tag}>#{tag}</S.Tag>
          ))}
        </S.TagList>
      )}
    </S.CardWrapper>
  );
};

export default Card;
