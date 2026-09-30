export type Product = {
  id: string;
  name: string;
  nameKo: string;
  tagline: string;
  price: number;
  volume: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "ritual-set",
    name: "Dew Ritual Set",
    nameKo: "이슬 리추얼 세트",
    tagline: "토너 에센스와 크림을 함께 쓰는 아침·저녁 루틴",
    price: 89000,
    volume: "120ml + 50ml",
    image: "/images/hero.png",
    imageAlt: "ONYU 이슬 리추얼 세트 — 토너 에센스와 크림",
    featured: true,
  },
  {
    id: "green-serum",
    name: "Green Calming Serum",
    nameKo: "그린 카밍 세럼",
    tagline: "수분막을 얇게 올려 주는 식물성 드롭 세럼",
    price: 52000,
    volume: "30ml",
    image: "/images/serum.png",
    imageAlt: "ONYU 그린 카밍 세럼 드롭퍼 보틀",
  },
  {
    id: "silken-cream",
    name: "Silken Recovery Cream",
    nameKo: "실큰 리커버리 크림",
    tagline: "하루의 끝을 감싸는 부드러운 장벽 크림",
    price: 48000,
    volume: "50ml",
    image: "/images/cream.png",
    imageAlt: "ONYU 실큰 리커버리 크림 자",
  },
];

export function formatWon(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value) + "원";
}
