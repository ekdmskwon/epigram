// src/app/page.tsx
"use client";

import { Button } from "@/components/button";

export default function Home() {
  return (
    <div>
      
      <Button variant="main" size="md">
        로그인
      </Button>
      
      <Button variant="wide" size="lg">
        로그인하기
      </Button>
    </div>
  );
}