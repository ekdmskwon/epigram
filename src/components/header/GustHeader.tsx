import Link from "next/link";
import Image from "next/image";
import whiteLogoImg from "../../../public/icons/white-logo.svg";
import * as S from "./style";

const GuestNavbar = () => {
  return (
    <S.HeaderBase>
      <S.InnerContainer>
        <S.CenteredContainer>
          <Link href="/">
            <S.Logo>
              <Image
                src={whiteLogoImg}
                alt="에피그램 로고"
                width={131}
                height={36}
                priority
              />
            </S.Logo>
          </Link>
        </S.CenteredContainer>
      </S.InnerContainer>
    </S.HeaderBase>
  );
};

export default GuestNavbar;
