import type { CardProps } from "./type";
import styled, { css, keyframes } from "styled-components";
import {
  CARD_PADDING,
  CARD_SIZES,
  TEXT_GAP,
  type CardSizeSpec,
} from "./type";

const cardFadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

const cardTypography = css`
  font-family: ${({ theme }) => theme.fonts.point};
  font-size: ${({ theme }) => theme.fontSizes.point.textXl.size};
  line-height: 40px;
  font-weight: 500;
`;

const atBreakpoints = (styles: (spec: CardSizeSpec) => ReturnType<typeof css>) =>
  CARD_SIZES.map((spec, index) => {
    const block = styles(spec);
    if (index === 0) return block;
    return css`
      @media (min-width: ${spec.minWidth}px) {
        ${block}
      }
    `;
  });

const skeletonBarStyles = css`
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.line100} 0%,
    ${({ theme }) => theme.colors.gray100} 50%,
    ${({ theme }) => theme.colors.line100} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: ${({ theme }) => theme.colors.line100};
  }
`;

const CardWrapper = styled.article<{
  $fixedSize?: boolean;
  $fullWidth?: boolean;
  $animationIndex?: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 100%;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      max-width: none;
    `}

  ${({ $fixedSize, $fullWidth }) =>
    $fullWidth
      ? null
      : $fixedSize
        ? css`
            ${atBreakpoints(
              (spec) => css`
                width: ${spec.width}px;
              `,
            )}
          `
        : css`
            width: 100%;
            ${atBreakpoints(
              (spec) => css`
                max-width: ${spec.width}px;
              `,
            )}
          `}

  ${({ $animationIndex }) =>
    $animationIndex !== undefined &&
    css`
      animation: ${cardFadeInUp} 0.45s cubic-bezier(0.4, 0, 0.2, 1) both;
      animation-delay: ${$animationIndex * 0.07}s;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

const CardBody = styled.div<{ $embedded?: boolean }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${({ $embedded }) => ($embedded ? 0 : `${CARD_PADDING}px`)};

  ${({ $embedded }) =>
    !$embedded &&
    atBreakpoints(
      (spec) => css`
        min-height: ${spec.minHeight}px;
      `,
    )}
`;

const CardBackground = styled.div`
  position: absolute;
  inset: 0;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.line100};
  box-shadow: 0 2.75px 35px rgba(0, 0, 0, 0.07);
  pointer-events: none;

  ${atBreakpoints(
    (spec) => css`
      border-radius: ${spec.borderRadius}px;
    `,
  )}
`;

const CardLines = styled.div`
  position: absolute;
  top: ${CARD_PADDING}px;
  right: ${CARD_PADDING}px;
  bottom: ${CARD_PADDING}px;
  left: ${CARD_PADDING}px;
  pointer-events: none;

  ${atBreakpoints(
    (spec) => css`
      background-image: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent ${spec.lineStep - 1}px,
        #f2f2f2 ${spec.lineStep - 1}px,
        #f2f2f2 ${spec.lineStep}px
      );
    `,
  )}
`;

const CardInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${TEXT_GAP}px;
`;

const Content = styled.blockquote`
  margin: 0;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.black600};
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: break-word;

  ${cardTypography}
`;

const Author = styled.p`
  margin: 0;
  flex-shrink: 0;
  text-align: right;
  color: ${({ theme }) => theme.colors.blue400};

  ${cardTypography}
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px 8px;
  margin-top: ${TEXT_GAP}px;
  max-width: 100%;
`;

const Tag = styled.span`
  color: ${({ theme }) => theme.colors.blue400};

  ${cardTypography}
`;

const SkeletonInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${TEXT_GAP}px;
`;

const SkeletonLine = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  ${skeletonBarStyles}

  ${atBreakpoints(
    (spec) => css`
      height: ${spec.lineStep - 2}px;
    `,
  )}
`;

const SkeletonAuthor = styled.div`
  align-self: flex-end;
  margin-top: auto;
  ${skeletonBarStyles}

  ${atBreakpoints(
    (spec) => css`
      width: ${Math.round(spec.width * 0.28)}px;
      height: ${spec.lineStep - 2}px;
    `,
  )}
`;

const SkeletonTagRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: ${TEXT_GAP}px;
  max-width: 100%;
`;

const SkeletonTag = styled.div`
  border-radius: 6px;
  ${skeletonBarStyles}

  ${atBreakpoints(
    (spec) => css`
      width: ${Math.round(spec.width * 0.18)}px;
      height: ${spec.lineStep - 2}px;
    `,
  )}
`;

const Card = ({
  content,
  author,
  tags = [],
  fixedSize = false,
  fullWidth = false,
  embedded = false,
  animationIndex,
}: CardProps) => {
  return (
    <CardWrapper
      $fixedSize={fixedSize}
      $fullWidth={fullWidth}
      $animationIndex={animationIndex}
    >
      <CardBody $embedded={embedded}>
        {!embedded && <CardBackground aria-hidden />}
        {!embedded && <CardLines aria-hidden />}
        <CardInner>
          <Content>{content}</Content>
          <Author>- {author} -</Author>
        </CardInner>
      </CardBody>
      {tags.length > 0 && (
        <TagList>
          {tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </TagList>
      )}
    </CardWrapper>
  );
};

export const CardSkeleton = ({ fullWidth = false }: { fullWidth?: boolean }) => (
  <CardWrapper $fixedSize={!fullWidth} $fullWidth={fullWidth} aria-hidden>
    <CardBody>
      <CardBackground aria-hidden />
      <CardLines aria-hidden />
      <SkeletonInner>
        <SkeletonLine $width="92%" />
        <SkeletonLine $width="78%" />
        <SkeletonLine $width="60%" />
        <SkeletonAuthor />
      </SkeletonInner>
    </CardBody>
    <SkeletonTagRow>
      <SkeletonTag />
      <SkeletonTag />
    </SkeletonTagRow>
  </CardWrapper>
);

export default Card;
