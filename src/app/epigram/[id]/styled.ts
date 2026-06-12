import styled from "styled-components";

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

export const StatusMessage = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.black400};
  text-align: center;
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
