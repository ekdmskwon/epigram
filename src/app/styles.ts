import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 120px 24px 48px;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
  gap: 24px;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.point};
  font-size: ${({ theme }) => theme.fontSizes.point.text2xl.size};
  line-height: ${({ theme }) => theme.fontSizes.point.text2xl.lineHeight};
  color: ${({ theme }) => theme.colors.black950};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textLg.lineHeight};
  color: ${({ theme }) => theme.colors.black400};
  max-width: 480px;
`;

export const Actions = styled.div`
  width: 100%;
  max-width: 320px;
  margin-top: 16px;
`;
