export interface CardProps {
  content: string;
  author: string;
  tags?: string[];
  fixedSize?: boolean;
  fullWidth?: boolean;
  embedded?: boolean;
  animationIndex?: number;
}

export const CARD_PADDING = 22;
export const TEXT_GAP = 8;

export interface CardSizeSpec {
  minWidth: number;
  width: number;
  minHeight: number;
  lineStep: number;
  borderRadius: number;
}

export const CARD_SIZES: CardSizeSpec[] = [
  {
    minWidth: 0,
    width: 286,
    minHeight: 106,
    lineStep: 40,
    borderRadius: 7,
  },
  {
    minWidth: 375,
    width: 312,
    minHeight: 120,
    lineStep: 40,
    borderRadius: 8,
  },
  {
    minWidth: 480,
    width: 384,
    minHeight: 146,
    lineStep: 40,
    borderRadius: 9,
  },
  {
    minWidth: 640,
    width: 540,
    minHeight: 124,
    lineStep: 40,
    borderRadius: 11,
  },
  {
    minWidth: 768,
    width: 640,
    minHeight: 148,
    lineStep: 40,
    borderRadius: 13,
  },
  {
    minWidth: 1024,
    width: 744,
    minHeight: 148,
    lineStep: 40,
    borderRadius: 14.67,
  },
];
