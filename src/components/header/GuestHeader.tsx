import Link from "next/link";
import Image from "next/image";
import * as S from "./style";

const GuestHeader = () => {
  return (
    <S.HeaderBase>
      <S.InnerContainer $layout="guest">
        <Link href="/">
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
      </S.InnerContainer>
    </S.HeaderBase>
  );
};

export default GuestHeader;
