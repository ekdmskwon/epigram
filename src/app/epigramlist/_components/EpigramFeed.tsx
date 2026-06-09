"use client";

import { useMemo } from "react";
import Image from "next/image";
import type { GetEpigramsResponse } from "@/api/epigram";
import CardSkeleton from "@/components/card/skeleton";
import EpigramFeedCard from "@/components/epigram/EpigramFeedCard";
import { useEpigrams } from "@/hooks/useEpigrams";
import { PAGE_SIZE } from "../constants";
import * as S from "../styled";

type EpigramFeedProps = {
  initialData: GetEpigramsResponse | null;
};

export default function EpigramFeed({ initialData }: EpigramFeedProps) {
  const { epigrams, nextCursor, isLoading, loadError, loadMore } = useEpigrams(
    PAGE_SIZE,
    initialData,
  );

  const skeletonIndices = useMemo(
    () => Array.from({ length: PAGE_SIZE }, (_, index) => index),
    [],
  );
  const leftSkeletonIndices = useMemo(
    () => skeletonIndices.filter((index) => index % 2 === 0),
    [skeletonIndices],
  );
  const rightSkeletonIndices = useMemo(
    () => skeletonIndices.filter((index) => index % 2 === 1),
    [skeletonIndices],
  );

  const epigramItems = useMemo(
    () => epigrams.map((epigram, index) => ({ epigram, index })),
    [epigrams],
  );
  const leftColumnItems = useMemo(
    () => epigramItems.filter(({ index }) => index % 2 === 0),
    [epigramItems],
  );
  const rightColumnItems = useMemo(
    () => epigramItems.filter(({ index }) => index % 2 === 1),
    [epigramItems],
  );

  return (
    <S.Main>
      <S.FeedTitle>피드</S.FeedTitle>

      {isLoading && epigrams.length === 0 ? (
        <>
          <S.FeedGridMobile aria-busy="true" aria-label="에피그램 로딩 중">
            {skeletonIndices.map((index) => (
              <CardSkeleton key={index} />
            ))}
          </S.FeedGridMobile>
          <S.FeedGridDesktop aria-busy="true" aria-label="에피그램 로딩 중">
            <S.FeedColumn>
              {leftSkeletonIndices.map((index) => (
                <CardSkeleton key={index} />
              ))}
            </S.FeedColumn>
            <S.FeedColumn>
              {rightSkeletonIndices.map((index) => (
                <CardSkeleton key={index} />
              ))}
            </S.FeedColumn>
          </S.FeedGridDesktop>
        </>
      ) : (
        <>
          {loadError && <S.StatusMessage>{loadError}</S.StatusMessage>}

          {epigrams.length === 0 ? (
            <S.StatusMessage>등록된 에피그램이 없습니다.</S.StatusMessage>
          ) : (
            <>
              <S.FeedGridMobile>
                {epigramItems.map(({ epigram, index }) => (
                  <EpigramFeedCard
                    key={epigram.id}
                    epigram={epigram}
                    index={index}
                    pageSize={PAGE_SIZE}
                  />
                ))}
              </S.FeedGridMobile>
              <S.FeedGridDesktop>
                <S.FeedColumn>
                  {leftColumnItems.map(({ epigram, index }) => (
                    <EpigramFeedCard
                      key={epigram.id}
                      epigram={epigram}
                      index={index}
                      pageSize={PAGE_SIZE}
                    />
                  ))}
                </S.FeedColumn>
                <S.FeedColumn>
                  {rightColumnItems.map(({ epigram, index }) => (
                    <EpigramFeedCard
                      key={epigram.id}
                      epigram={epigram}
                      index={index}
                      pageSize={PAGE_SIZE}
                    />
                  ))}
                </S.FeedColumn>
              </S.FeedGridDesktop>
            </>
          )}

          {nextCursor !== null && (
            <S.LoadMoreWrapper>
              <S.LoadMoreButton
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
              </S.LoadMoreButton>
            </S.LoadMoreWrapper>
          )}
        </>
      )}
    </S.Main>
  );
}
