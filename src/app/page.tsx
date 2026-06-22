"use client";

import Image from "next/image";
import LandingHeader from "@/components/header/LandingHeader";
import * as S from "./styles";

export default function HomePage() {
  return (
    <>
      <S.HeroWrapper>
        <Image
          src="/icons/landing-background.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "top center", zIndex: 0 }}
        />
        <LandingHeader />
        <S.HeroSection>
          <S.HeroHeading>
            나만 갖고 있기엔<br />아까운 글이 있지 않나요?
          </S.HeroHeading>
          <S.HeroSubtitle>다른 사람들과 감정을 공유해 보세요.</S.HeroSubtitle>
        </S.HeroSection>
      </S.HeroWrapper>

      <S.FeatureSection>
        <S.FeatureInner>
          <S.FeatureImageBox>
            <Image
              src="/icons/landing01.png"
              alt="에피그램 피드 예시"
              width={580}
              height={440}
              style={{ objectFit: "contain" }}
            />
          </S.FeatureImageBox>
          <S.FeatureTextBox>
            <S.FeatureHeading>
              명언이나 글귀,<br />토막 상식들을 공유해 보세요.
            </S.FeatureHeading>
            <S.FeatureDescription>
              나만 알던 소중한 글들을<br />다른 사람들에게 전파하세요.
            </S.FeatureDescription>
          </S.FeatureTextBox>
        </S.FeatureInner>
      </S.FeatureSection>

      <S.FeatureSection>
        <S.FeatureInner $reverse>
          <S.FeatureImageBox>
            <Image
              src="/icons/landing02.png"
              alt="감정 태그 선택 예시"
              width={580}
              height={360}
              style={{ objectFit: "contain" }}
            />
          </S.FeatureImageBox>
          <S.FeatureTextBox>
            <S.FeatureHeading>
              감정 상태에 따라,<br />알맞은 위로를 받을 수 있어요.
            </S.FeatureHeading>
            <S.FeatureDescription>
              태그를 통해 글을 모아 볼 수 있어요.
            </S.FeatureDescription>
          </S.FeatureTextBox>
        </S.FeatureInner>
      </S.FeatureSection>

      <S.FeatureSection>
        <S.FeatureInner>
          <S.FeatureImageBox>
            <Image
              src="/icons/landing03.png"
              alt="감정 통계 차트 예시"
              width={580}
              height={360}
              style={{ objectFit: "contain" }}
            />
          </S.FeatureImageBox>
          <S.FeatureTextBox>
            <S.FeatureHeading>
              매일 나의 감정을<br />기록해 보세요.
            </S.FeatureHeading>
            <S.FeatureDescription>
              감정 변화를 차트로 한눈에<br />확인할 수 있어요.
            </S.FeatureDescription>
          </S.FeatureTextBox>
        </S.FeatureInner>
      </S.FeatureSection>

      <S.FeatureCenterSection>
        <S.FeatureCenterInner>
          <S.FeatureCenterHeading>
            사용자들이 직접<br />인용한 에피그램들
          </S.FeatureCenterHeading>
          <S.FeatureCenterImageBox>
            <Image
              src="/icons/landing04.svg"
              alt="사용자 에피그램 목록 예시"
              width={680}
              height={600}
              style={{ objectFit: "contain" }}
            />
          </S.FeatureCenterImageBox>
        </S.FeatureCenterInner>
      </S.FeatureCenterSection>

      <S.WaveDivider aria-hidden />

      <S.CtaSection>
        <Image
          src="/icons/landing05.svg"
          alt="날마다 에피그램"
          width={368}
          height={210}
          style={{ objectFit: "contain" }}
        />
      </S.CtaSection>
    </>
  );
}
