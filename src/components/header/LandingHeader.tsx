"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as S from "./style";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <S.HeaderBase>
        <S.InnerContainer $layout="user">
          <S.LeftSection>
            <S.HamburgerButton
              type="button"
              aria-label="메뉴 열기"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <S.HamburgerIcon />
            </S.HamburgerButton>

            <Link href="/" onClick={closeMenu}>
              <S.Logo>
                <Image
                  src="/icons/logo-white.svg"
                  alt="Epigram 로고"
                  width={131}
                  height={36}
                  priority
                />
              </S.Logo>
            </Link>

            <S.MenuLinks>
              <Link href="/epigramlist">피드</Link>
            </S.MenuLinks>
          </S.LeftSection>

          <S.NavLink href="/login" onClick={closeMenu}>
            <S.UserLinkBox>
              <S.UserName>로그인</S.UserName>
            </S.UserLinkBox>
          </S.NavLink>
        </S.InnerContainer>
      </S.HeaderBase>

      <S.MobileMenuPanel $open={isMenuOpen} aria-hidden={!isMenuOpen}>
        <Link href="/epigramlist" onClick={closeMenu}>
          피드
        </Link>
        <Link href="/login" onClick={closeMenu}>
          로그인
        </Link>
      </S.MobileMenuPanel>
    </>
  );
};

export default LandingHeader;
