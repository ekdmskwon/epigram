import styled, { css, keyframes } from "styled-components";

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

export const TEXT_FIELD_PADDING = 22;
export const TEXT_GAP = 8;
export const CARD_FIXED_WIDTH = 585;
export const CARD_FIXED_HEIGHT = 259;
const LINE_STEP = 40;

export const pointText2xlMedium = css`
  font-family: ${({ theme }) => theme.fonts.point};
  font-size: ${({ theme }) => theme.fontSizes.point.text2xl.size};
  line-height: ${({ theme }) => theme.fontSizes.point.text2xl.lineHeight};
  font-weight: 500;
`;

export const CardWrapper = styled.article<{
  $fixedSize?: boolean;
  $animationIndex?: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: ${({ $fixedSize }) =>
    $fixedSize ? `${CARD_FIXED_WIDTH}px` : "100%"};
  max-width: 100%;

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

export const CardBody = styled.div<{ $fixedSize?: boolean }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: ${TEXT_FIELD_PADDING}px;

  ${({ $fixedSize }) =>
    $fixedSize &&
    css`
      height: ${CARD_FIXED_HEIGHT}px;
      overflow: hidden;
    `}
`;

export const CardBackground = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 14.67px;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.line100};
  box-shadow: 0 2.75px 35px rgba(0, 0, 0, 0.07);
  pointer-events: none;
`;

export const CardLines = styled.div`
  position: absolute;
  top: ${TEXT_FIELD_PADDING}px;
  right: ${TEXT_FIELD_PADDING}px;
  bottom: ${TEXT_FIELD_PADDING}px;
  left: ${TEXT_FIELD_PADDING}px;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent ${LINE_STEP - 1}px,
    #f2f2f2 ${LINE_STEP - 1}px,
    #f2f2f2 ${LINE_STEP}px
  );
  pointer-events: none;
`;

/** 본문 + 저자 frame */
export const CardInner = styled.div<{ $fixedSize?: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${TEXT_GAP}px;

  ${({ $fixedSize }) =>
    $fixedSize &&
    css`
      height: 100%;
      overflow: hidden;
    `}
`;

export const Content = styled.blockquote<{ $fixedSize?: boolean }>`
  margin: 0;
  color: ${({ theme }) => theme.colors.black950};
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: break-word;
  ${pointText2xlMedium}

  ${({ $fixedSize }) =>
    $fixedSize &&
    css`
      flex: 1;
      min-height: 0;
      overflow: hidden;
    `}
`;

export const Author = styled.p`
  margin: 0;
  text-align: right;
  color: ${({ theme }) => theme.colors.blue400};
  ${pointText2xlMedium}
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px 8px;
  margin-top: ${TEXT_GAP}px;
  max-width: 100%;
`;

export const Tag = styled.span`
  color: ${({ theme }) => theme.colors.blue400};
  ${pointText2xlMedium}
`;
