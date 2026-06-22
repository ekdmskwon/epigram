"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { SCROLL_TOP_THRESHOLD } from "@/lib/epigramlist";

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
    <FabGroup>
      <CreateFab
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
      </CreateFab>
      <ScrollToTopWrapper $visible={showScrollTop}>
        <ScrollToTopButton
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
        </ScrollToTopButton>
      </ScrollToTopWrapper>
    </FabGroup>
  );
}

const FabGroup = styled.div`
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

const CreateFab = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  padding: 0 18px;
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.blue900};
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
    background-color: ${({ theme }) => theme.colors.blue800};
  }
`;

const ScrollToTopWrapper = styled.div<{ $visible: boolean }>`
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

const ScrollToTopButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue900};
  cursor: pointer;
  box-shadow: 0 2.75px 35px rgba(0, 0, 0, 0.07);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue800};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
