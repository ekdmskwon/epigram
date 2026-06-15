"use client";

import { useEffect, useState } from "react";
import { getEpigramDetail, type EpigramDetailResponse } from "@/api/epigram";
import Card from "@/components/card";
import CardSkeleton from "@/components/card/skeleton";
import * as S from "../styled";

type EpigramDetailProps = {
  epigramId: number;
};

export default function EpigramDetail({ epigramId }: EpigramDetailProps) {
  const [epigram, setEpigram] = useState<EpigramDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setLoadError("");

    getEpigramDetail(epigramId)
      .then((data) => {
        if (!cancelled) setEpigram(data);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(
            "에피그램을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [epigramId]);

  if (isLoading) {
    return (
      <S.CardWrapper aria-busy="true" aria-label="에피그램 로딩 중">
        <CardSkeleton />
      </S.CardWrapper>
    );
  }

  if (loadError || !epigram) {
    return <S.StatusMessage>{loadError}</S.StatusMessage>;
  }

  return (
    <S.CardWrapper>
      <Card
        content={epigram.content}
        author={epigram.author}
        tags={epigram.tags.map((tag) => tag.name)}
      />
    </S.CardWrapper>
  );
}
