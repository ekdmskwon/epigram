import styled from "styled-components";
import { HEADER_HEIGHT } from "@/components/header/style";
import {
  EPIGRAM_BACKGROUND,
  EPIGRAM_BACKGROUND_HEIGHT,
  EPIGRAM_BACKGROUND_WIDTH,
} from "@/lib/epigram-detail";

const PAGE_BACKGROUND = "#F8F9FA";

export const Page = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${PAGE_BACKGROUND};
`;

export const EpigramHeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, ${EPIGRAM_BACKGROUND_WIDTH}px);
  height: ${EPIGRAM_BACKGROUND_HEIGHT}px;
  background-image: url(${EPIGRAM_BACKGROUND});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% ${EPIGRAM_BACKGROUND_HEIGHT}px;
  pointer-events: none;
  z-index: 0;
`;

export const Main = styled.main`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 744px;
  margin: 0 auto;
  padding: ${HEADER_HEIGHT + 16}px 16px 80px;

  @media (min-width: 768px) {
    padding: ${HEADER_HEIGHT + 24}px 0 120px;
  }
`;
