import styled from "styled-components";
import { FORM_MAX_WIDTH } from "@/lib/addepigram-page";

const PAGE_BACKGROUND = "#FFFFFF";

export const Page = styled.div`
  min-height: 100vh;
  background-color: ${PAGE_BACKGROUND};
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 128px 16px 80px;

  @media (min-width: 768px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 1200px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const PageTitle = styled.h1`
  width: 100%;
  max-width: ${FORM_MAX_WIDTH}px;
  margin: 0 0 40px;
  font-family: var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: #121212;
`;