import styled from "styled-components";
import { HEADER_HEIGHT } from "@/components/header/style";

const HERO_HEIGHT = 1040;
const HERO_BG_WIDTH = 1920;

export const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${HERO_HEIGHT}px;
  background-image: url("/icons/landing-background.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: ${HERO_BG_WIDTH}px ${HERO_HEIGHT}px;
  background-color: #f8f9fa;

  @media (max-width: ${HERO_BG_WIDTH}px) {
    background-size: 100% ${HERO_HEIGHT}px;
  }
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${HERO_HEIGHT - HEADER_HEIGHT}px;
  padding: 0 24px;
  text-align: center;
  gap: 24px;
`;

export const HeroHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.point};
  font-size: 28px;
  line-height: 1.5;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black950};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.point.text3xl.size};
    line-height: ${({ theme }) => theme.fontSizes.point.text3xl.lineHeight};
  }

  @media (min-width: 1200px) {
    font-size: ${({ theme }) => theme.fontSizes.point.text4xl.size};
    line-height: ${({ theme }) => theme.fontSizes.point.text4xl.lineHeight};
  }
`;

export const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textSm.size};
  line-height: ${({ theme }) => theme.fontSizes.main.textSm.lineHeight};
  color: ${({ theme }) => theme.colors.black400};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
    line-height: ${({ theme }) => theme.fontSizes.main.textMd.lineHeight};
  }
`;

/* ── Feature Sections ── */

export const FeatureSection = styled.section<{ $bg?: string }>`
  width: 100%;
  background-color: ${({ theme, $bg }) => $bg ?? theme.colors.background100};
`;

export const FeatureInner = styled.div<{ $reverse?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;

  @media (min-width: 768px) {
    flex-direction: ${({ $reverse }) => ($reverse ? "row-reverse" : "row")};
    align-items: center;
    gap: 64px;
    padding: 100px 40px;
  }

  @media (min-width: 1200px) {
    padding: 120px 0;
  }
`;

export const FeatureImageBox = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 580px;
    height: auto;
    border-radius: 16px;
  }
`;

export const FeatureTextBox = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    gap: 24px;
  }
`;

export const FeatureHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.point};
  font-size: 24px;
  line-height: 1.5;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black950};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.point.text3xl.size};
    line-height: ${({ theme }) => theme.fontSizes.point.text3xl.lineHeight};
  }
`;

export const FeatureCenterSection = styled.section<{ $bg?: string }>`
  width: 100%;
  background-color: ${({ theme, $bg }) => $bg ?? theme.colors.background100};
`;

export const FeatureCenterInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;

  @media (min-width: 768px) {
    padding: 100px 40px;
    gap: 56px;
  }

  @media (min-width: 1200px) {
    padding: 120px 0;
  }
`;

export const FeatureCenterHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.point};
  font-size: 24px;
  line-height: 1.5;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black950};
  text-align: center;

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.point.text3xl.size};
    line-height: ${({ theme }) => theme.fontSizes.point.text3xl.lineHeight};
  }
`;

export const FeatureCenterImageBox = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 16px;
  }
`;

export const WaveDivider = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.background100};
  -webkit-mask-image:
    radial-gradient(circle at 50% 0%, transparent 14px, black 15px)
    0 0 / 28px 40px repeat-x;
  mask-image:
    radial-gradient(circle at 50% 0%, transparent 14px, black 15px)
    0 0 / 28px 40px repeat-x;
`;

export const CtaSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 540px;
  background-color: #ffffff;
  background-image: url("/icons/landing-background.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 1920px 1040px;

  @media (max-width: 1920px) {
    background-size: 100% 1040px;
  }

  @media (min-width: 768px) {
    min-height: 720px;
  }
`;

export const FeatureDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.blue600};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.main.textLg.size};
  }
`;
