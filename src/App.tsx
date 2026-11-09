import { useEffect, useRef, useState } from "react";

const ASSET = "/assets";

type Room = {
  name: string;
  image: string;
  description: string;
};

const rooms: Room[] = [
  {
    name: "Deluxe Double",
    image: `${ASSET}/c47bc.png`,
    description: "여유로운 휴식을 위한 디럭스 더블 객실",
  },
  {
    name: "Standard Double",
    image: `${ASSET}/50814.png`,
    description: "두 사람의 편안한 여행을 위한 스탠다드 더블",
  },
  {
    name: "Standard Twin",
    image: `${ASSET}/69b40.png`,
    description: "분리된 침대로 편안함을 더한 스탠다드 트윈",
  },
  {
    name: "Suite Room",
    image: `${ASSET}/92954.png`,
    description: "넓은 공간에서 누리는 여유로운 스위트",
  },
  {
    name: "Triple Single",
    image: `${ASSET}/ed456.png`,
    description: "세 명의 여행을 위한 트리플 싱글 객실",
  },
];

const diningBrands = [
  { name: "안목", category: "돼지국밥", image: `${ASSET}/7778b.png` },
  {
    name: "이태리피자",
    category: "화덕피자와 파스타",
    image: `${ASSET}/6a9c7.png`,
  },
  { name: "화락만리", category: "중식 다이닝", image: `${ASSET}/df798.png` },
  { name: "샤브남바완", category: "샤브샤브", image: `${ASSET}/167c9.png` },
];

const navItems = [
  { label: "호텔 소개", href: "#about" },
  { label: "객실", href: "#rooms" },
  { label: "미팅룸", href: "#meeting" },
  { label: "다이닝", href: "#dining" },
  { label: "오시는 길", href: "#location" },
];

function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      className="arrow-link"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 모바일 메뉴가 열린 상태에서는 배경 페이지 스크롤을 막습니다.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="logo-link" href="#home" aria-label="사우스 반데코 호텔 홈">
        <img src={`${ASSET}/1be6f.png`} alt="South Vandeco Hotel" />
      </a>

      <nav className="desktop-nav" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="booking-button" href="tel:0518155252">
        예약하기 <span aria-hidden="true">↗</span>
      </a>

      <button
        className={`menu-button ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="모바일 메뉴">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="tel:0518155252" onClick={() => setMenuOpen(false)}>
            예약하기 <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <img className="hero-image" src={`${ASSET}/81b9b.png`} alt="" />
      <div className="hero-shade" />
      <div className="content hero-content">
        <Header />
        <div className="hero-title">
          <span>A QUIET STAY</span>
          <span>IN SEOMYEON.</span>
        </div>
        <div className="hero-copy">
          <p>서면 한가운데, 편안한 쉼.</p>
          <ArrowLink href="#rooms">객실 둘러보기</ArrowLink>
        </div>
        <div className="hero-meta">
          <span>SEOMYEON, BUSAN</span>
          <span>SOUTH VANDECO HOTEL</span>
          <a href="tel:0518155252">051-815-5252</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const hotelFacts = [
    ["객실", "5가지 유형"],
    ["미팅룸", "November Hall"],
    ["호텔 위치", "부산 서면로 6"],
    ["예약 문의", "051-815-5252"],
  ];

  return (
    <section className="about-section" id="about">
      <div className="content">
        <div className="about-grid">
          <div className="about-image">
            <img src={`${ASSET}/7fd31.png`} alt="사우스 반데코 호텔 객실" />
          </div>
          <div className="about-title">
            <p className="eyebrow">ABOUT THE HOTEL</p>
            <h2>
              서면 한가운데,
              <br />
              편안한 쉼.
            </h2>
          </div>
          <div className="about-copy">
            <p>
              부산 서면의 모던 부티크 호텔.
              <br />
              청결을 기본으로 침구와 조명,
              <br />
              객실 동선을 세심하게 살폈습니다.
              <br />
              여행의 끝에 편안히 쉬어가세요.
            </p>
            <ArrowLink href="#rooms">호텔 소개 보기</ArrowLink>
          </div>
        </div>

        <div className="hotel-facts" id="meeting">
          {hotelFacts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{label === "예약 문의" ? <a href="tel:0518155252">{value}</a> : value}</dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageModal({ room, onClose }: { room: Room | null; onClose: () => void }) {
  useEffect(() => {
    if (!room) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [room, onClose]);

  if (!room) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="room-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${room.name} 객실 이미지`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="팝업 닫기">
          ×
        </button>
        <img src={room.image} alt={`${room.name} 객실`} />
        <div>
          <p>{room.name}</p>
          <span>{room.description}</span>
          <a href="tel:0518155252">예약 문의 051-815-5252</a>
        </div>
      </div>
    </div>
  );
}

function Rooms() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // 카드 한 장 너비만큼 부드럽게 이동해 화면 크기에 관계없이 슬라이드합니다.
  const moveSlider = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".room-card");
    track.scrollBy({
      left: direction * ((card?.offsetWidth ?? 360) + 28),
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="rooms-section" id="rooms">
        <div className="content rooms-heading">
          <div>
            <p className="eyebrow">ACCOMMODATION</p>
            <h2>
              ROOMS &amp;
              <br />
              SUITES
            </h2>
          </div>
          <p className="rooms-intro">
            스탠다드 더블부터 스위트까지.
            <br />
            인원과 일정에 맞는 객실을 둘러보세요.
          </p>
          <div className="rooms-actions">
            <ArrowLink href="#room-gallery">전체 객실 보기</ArrowLink>
            <div className="slider-controls">
              <button type="button" onClick={() => moveSlider(-1)} aria-label="이전 객실">
                ‹
              </button>
              <button type="button" onClick={() => moveSlider(1)} aria-label="다음 객실">
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="room-track" id="room-gallery" ref={trackRef}>
          {rooms.map((room, index) => (
            <button
              className={`room-card room-card-${index + 1}`}
              key={room.name}
              type="button"
              onClick={() => setSelectedRoom(room)}
              aria-label={`${room.name} 이미지 크게 보기`}
            >
              <img src={room.image} alt={`${room.name} 객실`} />
              <span className="room-card-shade" />
              <span className="room-card-label">
                <span>{room.name}</span>
                <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </section>
      <ImageModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </>
  );
}

function Dining() {
  return (
    <section className="dining-section" id="dining">
      <div className="content">
        <div className="dining-heading">
          <div>
            <p className="eyebrow">KIMFOOD BRANDS</p>
            <h2>다이닝</h2>
          </div>
          <p>킴푸드의 식음료 브랜드를 만나보세요.</p>
          <ArrowLink href="#brand-list">브랜드 보기</ArrowLink>
        </div>
        <div className="brand-grid" id="brand-list">
          {diningBrands.map((brand) => (
            <article key={brand.name}>
              <img src={brand.image} alt={`${brand.name}의 ${brand.category}`} />
              <h3>{brand.name}</h3>
              <p>{brand.category}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const mapUrl = "https://map.naver.com/p/search/부산광역시%20부산진구%20서면로%206";

  return (
    <footer id="location">
      <div className="content footer-content">
        <a href="#home" aria-label="맨 위로 이동">
          <img src={`${ASSET}/1be6f.png`} alt="South Vandeco Hotel" />
        </a>
        <div className="footer-address">
          <p>부산광역시 부산진구 서면로 6</p>
          <ArrowLink href={mapUrl} external>
            오시는 길
          </ArrowLink>
        </div>
        <div className="footer-contact">
          <p>예약 문의</p>
          <a href="tel:0518155252">051-815-5252</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <About />
      <Rooms />
      <Dining />
      <Footer />
    </main>
  );
}
