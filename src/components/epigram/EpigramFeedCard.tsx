import Card from "@/components/card";
import type { Epigram } from "@/api/epigram";

type EpigramFeedCardProps = {
  epigram: Epigram;
  index: number;
  pageSize: number;
};

export default function EpigramFeedCard({
  epigram,
  index,
  pageSize,
}: EpigramFeedCardProps) {
  return (
    <Card
      content={epigram.content}
      author={epigram.author}
      tags={epigram.tags.map((tag) => tag.name)}
      fixedSize
      animationIndex={index % pageSize}
    />
  );
}
