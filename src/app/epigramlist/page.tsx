"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getEpigrams, type Epigram } from "@/api/epigram";
import { getUserMe } from "@/api/user";
import Card from "@/components/card";
import CardSkeleton from "@/components/card/skeleton";
import GuestHeader from "@/components/header/GuestHeader";
import UserHeader from "@/components/header/UserHeader";
import {
  getAccessToken,
  getUserProfile,
  setUserProfile,
} from "@/lib/auth-token";
import * as S from "./styled";

const PAGE_SIZE = 6;
const SCROLL_TOP_THRESHOLD = 200;

export default function EpigramListPage() {
  const router = useRouter();
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const applyEpigramResponse = useCallback(
    (
      response: { list: Epigram[]; nextCursor: number | null },
      isInitialLoad: boolean,
    ) => {
      setEpigrams((prev) =>
        isInitialLoad ? response.list : [...prev, ...response.list],
      );
      setNextCursor(response.nextCursor);
    },
    [],
  );

  const loadEpigrams = useCallback(
    async (cursor?: number) => {
      const isInitialLoad = cursor === undefined;

      if (isInitialLoad) {
        setIsLoading(true);
        setLoadError("");
      } else {
        setIsLoadingMore(true);
      }

      try {
        const response = await getEpigrams({
          limit: PAGE_SIZE,
          cursor,
        });

        applyEpigramResponse(response, isInitialLoad);
      } catch {
        setLoadError(
          isInitialLoad
            ? "에피그램을 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
            : "에피그램을 더 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
        );
      } finally {
        if (isInitialLoad) {
          setIsLoading(false);
        } else {
          setIsLoadingMore(false);
        }
      }
    },
    [applyEpigramResponse],
  );

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);

    if (!token) return;

    const cachedProfile = getUserProfile();
    if (cachedProfile.nickname) {
      setUserName(cachedProfile.nickname);
    }
    if (cachedProfile.image) {
      setProfileImageUrl(cachedProfile.image);
    }

    getUserMe()
      .then((user) => {
        setUserName(user.nickname);
        setProfileImageUrl(user.image);
        setUserProfile(user.nickname, user.image);
      })
      .catch(() => {
        if (!getAccessToken()) {
          setIsLoggedIn(false);
          setUserName("");
          setProfileImageUrl(null);
        }
      });
  }, []);

  useEffect(() => {
    loadEpigrams();
  }, [loadEpigrams]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_TOP_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoadMore = () => {
    if (nextCursor === null || isLoadingMore) return;
    loadEpigrams(nextCursor);
  };

  const handleCreateEpigram = () => {
    router.push("/addepigram");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const renderCard = (epigram: Epigram, index: number) => (
    <Card
      key={epigram.id}
      content={epigram.content}
      author={epigram.author}
      tags={epigram.tags.map((tag) => tag.name)}
      fixedSize
      animationIndex={index % PAGE_SIZE}
    />
  );

  return (
    <S.Page>
      {isLoggedIn ? (
        <UserHeader
          userName={userName}
          profileImageUrl={profileImageUrl ?? undefined}
        />
      ) : (
        <GuestHeader />
      )}

      <S.Main>
        <S.FeedTitle>피드</S.FeedTitle>

        {isLoading ? (
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
                  {epigramItems.map(({ epigram, index }) =>
                    renderCard(epigram, index),
                  )}
                </S.FeedGridMobile>
                <S.FeedGridDesktop>
                  <S.FeedColumn>
                    {leftColumnItems.map(({ epigram, index }) =>
                      renderCard(epigram, index),
                    )}
                  </S.FeedColumn>
                  <S.FeedColumn>
                    {rightColumnItems.map(({ epigram, index }) =>
                      renderCard(epigram, index),
                    )}
                  </S.FeedColumn>
                </S.FeedGridDesktop>
              </>
            )}

            {nextCursor !== null && (
              <S.LoadMoreWrapper>
                <S.LoadMoreButton
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  <Image
                    src="/icons/button-plus.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden
                  />
                  {isLoadingMore ? "불러오는 중..." : "에피그램 더보기"}
                </S.LoadMoreButton>
              </S.LoadMoreWrapper>
            )}
          </>
        )}
      </S.Main>

      <S.FabGroup>
        <S.CreateFab
          type="button"
          onClick={handleCreateEpigram}
          aria-label="에피그램 만들기"
        >
          <Image
            src="/icons/button-plus.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden
          />
          에피그램 만들기
        </S.CreateFab>
        <S.ScrollToTopWrapper $visible={showScrollTop}>
          <S.ScrollToTopButton
            type="button"
            onClick={handleScrollToTop}
            aria-label="맨 위로"
            tabIndex={showScrollTop ? 0 : -1}
          >
            <Image
              src="/icons/button-arrow.svg"
              alt=""
              width={16}
              height={10}
              aria-hidden
            />
          </S.ScrollToTopButton>
        </S.ScrollToTopWrapper>
      </S.FabGroup>
    </S.Page>
  );
}
