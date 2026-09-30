"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { formatWon, products, type Product } from "@/data/products";

type CartItem = { product: Product; qty: number };

export default function LandingPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  );
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [cart],
  );

  function addToCart(product: Product) {
    setCart((prev) => {
      const found = prev.find((item) => item.product.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
    setNotice(`${product.nameKo}를 담았습니다`);
    window.setTimeout(() => setNotice(null), 2200);
  }

  function changeQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }

  function checkout() {
    if (!cart.length) return;
    setNotice("주문이 접수되었습니다. 감사합니다.");
    setCart([]);
    setCartOpen(false);
    window.setTimeout(() => setNotice(null), 2800);
  }

  return (
    <div className="relative overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-forest/10 bg-[#f3efe6]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#top" className="font-serif text-2xl tracking-[0.35em] text-forest">
            ONYU
          </a>
          <nav className="hidden items-center gap-10 text-sm tracking-[0.18em] text-forest/80 md:flex">
            <a href="#story" className="hover:text-forest">
              브랜드
            </a>
            <a href="#shop" className="hover:text-forest">
              제품
            </a>
            <a href="#ritual" className="hover:text-forest">
              리추얼
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden rounded-full border border-forest/20 px-3 py-1.5 text-xs tracking-widest"
              onClick={() => setMenuOpen((open) => !open)}
            >
              MENU
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="rounded-full border border-forest/25 px-4 py-2 text-xs tracking-[0.2em]"
            >
              BAG {count}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="flex flex-col gap-4 border-t border-forest/10 px-5 py-4 text-sm tracking-[0.18em] md:hidden">
            <a href="#story" onClick={() => setMenuOpen(false)}>
              브랜드
            </a>
            <a href="#shop" onClick={() => setMenuOpen(false)}>
              제품
            </a>
            <a href="#ritual" onClick={() => setMenuOpen(false)}>
              리추얼
            </a>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="relative min-h-[100svh] pt-16 md:pt-20">
          <Image
            src="/images/hero.png"
            alt="바위에 놓인 ONYU 토너와 크림, 이슬이 맺힌 초록 배경"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c2a22]/70 via-[#1c2a22]/25 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl flex-col justify-end px-5 pb-16 md:justify-center md:px-8 md:pb-0">
            <p className="mb-4 text-xs tracking-[0.4em] text-white/80">
              BOTANICAL SKINCARE
            </p>
            <h1 className="max-w-xl font-serif text-5xl leading-[1.05] text-white md:text-7xl">
              이슬이 머무는
              <br />
              피부 시간
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/85 md:text-base">
              숲의 그늘과 맑은 물에서 영감을 받은 ONYU.
              자극 없이 촉촉하게, 하루를 고요하게 열어 줍니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-full bg-white px-7 py-3 text-xs tracking-[0.22em] text-forest"
              >
                SHOP THE RITUAL
              </a>
              <a
                href="#story"
                className="rounded-full border border-white/50 px-7 py-3 text-xs tracking-[0.22em] text-white"
              >
                OUR STORY
              </a>
            </div>
          </div>
        </section>

        <section id="story" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div>
            <p className="text-xs tracking-[0.35em] text-sage">PHILOSOPHY</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              온유하게,
              <br />
              피부를 쉬게 하다
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-8 text-forest/80">
            <p>
              ONYU는 과한 향과 자극을 덜어내고, 피부가 스스로 숨을 고를 수
              있는 최소의 루틴을 제안합니다. 무광 유리와 실버 캡은 매일의
              손끝에 남는 온도를 위해 골랐습니다.
            </p>
            <p>
              핵심은 수분과 장벽. 세럼이 빠르게 스며들고, 크림이 그 위를
              잠그듯 덮습니다. 아침에는 가볍게, 밤에는 더 깊게.
            </p>
          </div>
        </section>

        <section id="shop" className="bg-[#e8eee6] px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs tracking-[0.35em] text-sage">COLLECTION</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl">제품</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-forest/70">
                세 가지면 충분합니다. 세럼, 크림, 그리고 함께 쓰기 좋은 리추얼
                세트.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[28px] bg-[#f7f4ee] shadow-[0_20px_50px_-30px_rgba(44,70,56,0.45)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] tracking-[0.22em] text-sage">
                      {product.volume}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl">{product.nameKo}</h3>
                    <p className="mt-2 text-sm leading-6 text-forest/70">
                      {product.tagline}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm tracking-wide">
                        {formatWon(product.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-forest px-4 py-2 text-[11px] tracking-[0.18em] text-white"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ritual" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
            <Image
              src="/images/serum.png"
              alt="창가 빛 아래의 ONYU 세럼"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.35em] text-sage">HOW TO USE</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">하루 두 번의 리추얼</h2>
            <ol className="mt-10 space-y-8">
              <li>
                <p className="text-xs tracking-[0.25em] text-sage">01 — SERUM</p>
                <p className="mt-2 text-sm leading-7 text-forest/80">
                  세안 후 물기를 남긴 채 세럼 3~4방울을 손바닥에 덜어 볼,
                  이마, 목까지 눌러 흡수시킵니다.
                </p>
              </li>
              <li>
                <p className="text-xs tracking-[0.25em] text-sage">02 — CREAM</p>
                <p className="mt-2 text-sm leading-7 text-forest/80">
                  크림을 소량 녹인 뒤 바깥에서 안쪽으로 감싸듯 펴 바릅니다.
                  밤에는 한 겹 더.
                </p>
              </li>
              <li>
                <p className="text-xs tracking-[0.25em] text-sage">03 — SET</p>
                <p className="mt-2 text-sm leading-7 text-forest/80">
                  리추얼 세트의 에센스로 결을 정리한 뒤 크림으로 잠그면, 하루
                  종일 건조하지 않은 피부를 유지하기 좋습니다.
                </p>
              </li>
            </ol>
            <button
              type="button"
              onClick={() => addToCart(products[0])}
              className="mt-10 rounded-full bg-forest px-7 py-3 text-xs tracking-[0.22em] text-white"
            >
              리추얼 세트 담기
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-forest/10 bg-[#2c4638] px-5 py-16 text-[#f3efe6] md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-3xl tracking-[0.35em]">ONYU</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/70">
              온유한 스킨케어. 서울에서 작은 배치로 만듭니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm text-white/75">
            <div className="space-y-2">
              <p>고객센터 10:00–17:00</p>
              <p>hello@onyu.store</p>
            </div>
            <div className="space-y-2">
              <p>배송 안내</p>
              <p>교환·반품</p>
              <p>개인정보처리방침</p>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-6xl text-xs tracking-widest text-white/40">
          © 2026 ONYU. ALL RIGHTS RESERVED.
        </p>
      </footer>

      {cartOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-forest/40"
            aria-label="닫기"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#f7f4ee] shadow-2xl">
            <div className="flex items-center justify-between border-b border-forest/10 px-6 py-5">
              <h2 className="font-serif text-2xl">장바구니</h2>
              <button type="button" onClick={() => setCartOpen(false)}>
                닫기
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <p className="text-sm text-forest/60">아직 담긴 제품이 없습니다.</p>
              ) : (
                <ul className="space-y-5">
                  {cart.map((item) => (
                    <li key={item.product.id} className="flex gap-4">
                      <div className="relative h-20 w-16 overflow-hidden rounded-lg bg-mist">
                        <Image
                          src={item.product.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-lg">{item.product.nameKo}</p>
                        <p className="text-sm text-forest/70">
                          {formatWon(item.product.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-sm">
                          <button
                            type="button"
                            onClick={() => changeQty(item.product.id, -1)}
                          >
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => changeQty(item.product.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-forest/10 px-6 py-5">
              <div className="mb-4 flex justify-between text-sm">
                <span>합계</span>
                <span>{formatWon(total)}</span>
              </div>
              <button
                type="button"
                onClick={checkout}
                disabled={!cart.length}
                className="w-full rounded-full bg-forest py-3 text-xs tracking-[0.22em] text-white disabled:opacity-40"
              >
                주문하기
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      {notice ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-forest px-5 py-3 text-xs tracking-widest text-white shadow-lg">
          {notice}
        </div>
      ) : null}
    </div>
  );
}
