import Link from "next/link";
import Image from "next/image";
import whiteLogoImg from "../../../public/icons/white-logo.svg";
import defaultAvatarImg from "../../../public/icons/default-avatar.svg";
import { UserHeaderProps } from "./type";
import * as S from "./style";

const UserHeader = ({ userName, profileImageUrl }: UserHeaderProps) => {
  return (
    <S.HeaderBase>
      <S.InnerContainer>
        <S.LeftSection>
          <Link href="/">
            <S.Logo>
              <Image
                src={whiteLogoImg}
                alt="Epigram 로고"
                width={131}
                height={36}
                priority
              />
            </S.Logo>
          </Link>
          <S.MenuLinks>
            <Link href="/feed">피드</Link>
            <Link href="/search">검색</Link>
          </S.MenuLinks>
        </S.LeftSection>

        <Link href="/settings" style={{ textDecoration: "none" }}>
          <S.UserLinkBox>
            {profileImageUrl ? (
              <S.ProfileImageWrapper>
                <Image
                  src={profileImageUrl || defaultAvatarImg}
                  alt={
                    profileImageUrl ? `${userName}님의 프로필` : "기본 아바타"
                  }
                  fill
                  style={{ objectFit: "cover" }}
                />
              </S.ProfileImageWrapper>
            ) : (
              <Image
                src={defaultAvatarImg}
                alt="기본 아바타"
                width={24}
                height={24}
              />
            )}
            <S.UserName>{userName}</S.UserName>
          </S.UserLinkBox>
        </Link>
      </S.InnerContainer>
    </S.HeaderBase>
  );
};

export default UserHeader;
