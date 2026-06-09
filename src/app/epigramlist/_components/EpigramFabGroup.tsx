"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SCROLL_TOP_THRESHOLD } from "../constants";
import * as S from "../styled";

export default function EpigramFabGroup() {
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const handleCreateEpigram = () => {
    router.push("/addepigram");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
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
  );
}
