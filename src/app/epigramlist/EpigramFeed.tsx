"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { HEADER_HEIGHT } from "@/components/header/style";
import type { Epigram } from "@/api/epigram";
import Card, { CardSkeleton } from "@/components/card";
import { useEpigrams } from "@/hooks/useEpigrams";
import { PAGE_SIZE } from "@/lib/epigramlist";
import type { EpigramFeedProps } from "./type";

const SKELETON_INDICES = Array.from({ length: PAGE_SIZE }, (_, index) => index);

function FeedCard({
  epigram,
  animationIndex,
}: {
  epigram: Epigram;
  animationIndex: number;
}) {
  return (
    <CardLink href={`/epigrams/${epigram.id}`}>
      <Card
        content={epigram.content}
        author={epigram.author}
        tags={epigram.tags.map((tag) => tag.name)}
        fullWidth
        animationIndex={animationIndex}
      />
    </CardLink>
  );
}

export default function EpigramFeed({ initialData }: EpigramFeedProps) {
  const { epigrams, nextCursor, isLoading, loadError, loadMore } = useEpigrams(
    PAGE_SIZE,
    initialData,
  );

  return (
    <Main>
      <FeedTitle>피드</FeedTitle>

      {isLoading && epigrams.length === 0 ? (
        <FeedGrid aria-busy="true" aria-label="에피그램 로딩 중">
          {SKELETON_INDICES.map((index) => (
            <CardSkeleton key={index} fullWidth />
          ))}
        </FeedGrid>
      ) : (
        <>
          {loadError && <StatusMessage>{loadError}</StatusMessage>}

          {epigrams.length === 0 ? (
            !loadError && (
              <StatusMessage>등록된 에피그램이 없습니다.</StatusMessage>
            )
          ) : (
            <FeedGrid>
              {epigrams.map((epigram, index) => (
                <FeedCard
                  key={epigram.id}
                  epigram={epigram}
                  animationIndex={index % PAGE_SIZE}
                />
              ))}
            </FeedGrid>
          )}

          {nextCursor !== null && (
            <LoadMoreWrapper>
              <LoadMoreButton
                type="button"
                onClick={loadMore}
                disabled={isLoading}
              >
                <Image
                  src="/icons/button-plus.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden
                />
                {isLoading ? "불러오는 중..." : "에피그램 더보기"}
              </LoadMoreButton>
            </LoadMoreWrapper>
          )}
        </>
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${HEADER_HEIGHT + 48}px 16px 120px;

  @media (min-width: 768px) {
    padding: ${HEADER_HEIGHT + 80}px 40px 120px;
  }

  @media (min-width: 1200px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const FeedTitle = styled.h1`
  margin: 0 0 40px;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.text2xl.size};
  line-height: ${({ theme }) => theme.fontSizes.main.text2xl.lineHeight};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black950};
`;

const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 32px;
    align-items: start;
  }
`;

const CardLink = styled(Link)`
  display: block;
  width: 100%;
  min-width: 0;
  color: inherit;
  text-decoration: none;
`;

const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`;

const LoadMoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  padding: 0 18px;
  border: 1px solid ${({ theme }) => theme.colors.line200};
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.blue100};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue500};
  cursor: pointer;
  box-shadow: 0 2.75px 35px rgba(0, 0, 0, 0.07);
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

const StatusMessage = styled.p`
  margin: 0 0 24px;
  font-size: ${({ theme }) => theme.fontSizes.main.textMd.size};
  color: ${({ theme }) => theme.colors.black400};
  text-align: center;
`;
