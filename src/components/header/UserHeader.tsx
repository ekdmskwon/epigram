"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserHeaderProps } from "./type";
import * as S from "./style";

const UserHeader = ({ userName, profileImageUrl }: UserHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarSrc = profileImageUrl || "/icons/default-avatar.svg";

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
              <Link href="/search">검색</Link>
            </S.MenuLinks>
          </S.LeftSection>

          <S.NavLink href="/settings" onClick={closeMenu}>
            <S.UserLinkBox>
              <S.ProfileImageWrapper>
                <Image
                  src={avatarSrc}
                  alt={
                    profileImageUrl
                      ? `${userName}님의 프로필`
                      : "기본 아바타"
                  }
                  fill
                  sizes="32px"
                  style={{
                    objectFit: profileImageUrl ? "cover" : "contain",
                  }}
                />
              </S.ProfileImageWrapper>
              <S.UserName>{userName}</S.UserName>
            </S.UserLinkBox>
          </S.NavLink>
        </S.InnerContainer>
      </S.HeaderBase>

      <S.MobileMenuPanel $open={isMenuOpen} aria-hidden={!isMenuOpen}>
        <Link href="/epigramlist" onClick={closeMenu}>
          피드
        </Link>
        <Link href="/search" onClick={closeMenu}>
          검색
        </Link>
      </S.MobileMenuPanel>
    </>
  );
};

export default UserHeader;
