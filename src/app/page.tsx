"use client";

import { useRouter } from "next/navigation";
import GuestHeader from "@/components/header/GuestHeader";
import { Button } from "@/components/button";
import * as S from "./styled";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <GuestHeader />
      <S.Main>
        <S.Title>오늘의 감정을 기록해보세요</S.Title>
        <S.Description>
          Epigram에서 하루의 에피소드를 남기고, 감정을 나눠보세요.
        </S.Description>
        <S.Actions>
          <Button
            variant="wide"
            size="lg"
            onClick={() => router.push("/signup")}
          >
            회원가입
          </Button>
        </S.Actions>
      </S.Main>
    </>
  );
}
