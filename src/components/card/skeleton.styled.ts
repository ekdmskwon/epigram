import styled, { css, keyframes } from "styled-components";
import { TEXT_GAP } from "./styled";

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

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

export const SkeletonInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${TEXT_GAP}px;
  height: 100%;
`;

export const SkeletonLine = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  height: 24px;
  ${skeletonBarStyles}
`;

export const SkeletonAuthor = styled.div`
  align-self: flex-end;
  width: 120px;
  height: 24px;
  margin-top: auto;
  ${skeletonBarStyles}
`;

export const SkeletonTagRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: ${TEXT_GAP}px;
  max-width: 100%;
`;

export const SkeletonTag = styled.div`
  width: 72px;
  height: 24px;
  border-radius: 6px;
  ${skeletonBarStyles}
`;
