import styled, { css } from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 200px 16px 120px;

  @media (min-width: 768px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (min-width: 1200px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const FeedTitle = styled.h1`
  margin: 0 0 40px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.text2xl.size};
  line-height: ${({ theme }) => theme.fontSizes.main.text2xl.lineHeight};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black950};
`;

const feedColumnStyles = css`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 768px) {
    gap: 40px;
  }
`;

export const FeedGridMobile = styled.div`
  ${feedColumnStyles}

  @media (min-width: 768px) {
    display: none;
  }
`;

export const FeedGridDesktop = styled.div`
  display: none;
  gap: 32px;

  @media (min-width: 768px) {
    display: flex;
    gap: 40px 32px;
  }
`;

export const FeedColumn = styled.div`
  ${feedColumnStyles}
  flex: 1;
  min-width: 0;
  align-items: flex-end;
`;

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`;

const outlinePillButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  padding: 0 24px;
  border: 1px solid ${({ theme }) => theme.colors.line200};
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.background100};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue500};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.line100};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const LoadMoreButton = styled.button`
  ${outlinePillButtonStyles}
  min-width: 200px;
`;

export const FabGroup = styled.div`
  position: fixed;
  right: 16px;
  bottom: 24px;
  z-index: 900;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (min-width: 768px) {
    right: 40px;
    bottom: 40px;
  }
`;

export const CreateFab = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  padding: 0 18px;
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.blue950};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 2.75px 35px rgba(0, 0, 0, 0.07);
  transition: background-color 0.2s ease;

  img {
    filter: brightness(0) invert(1);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue900};
  }
`;

export const ScrollToTopWrapper = styled.div<{ $visible: boolean }>`
  overflow: hidden;
  max-height: ${({ $visible }) => ($visible ? "60px" : "0")};
  margin-top: ${({ $visible }) => ($visible ? "12px" : "0")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "8px")});
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition:
    max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    margin-top 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease,
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.2s ease;
    transform: none;
  }
`;

export const ScrollToTopButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue950};
  cursor: pointer;
  box-shadow: 0 2.75px 35px rgba(0, 0, 0, 0.07);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue900};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const StatusMessage = styled.p`
  margin: 0 0 24px;
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.black400};
  text-align: center;
`;
