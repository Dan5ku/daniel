import { useEffect, useState, type FC } from "react";
import imageMe1 from "../assets/image-me-1.png";
import imageMe2 from "../assets/image-me-2.png";
import imageMe3 from "../assets/image-me-3.png";
import imageMe4 from "../assets/image-me-4.png";
import imageMe5 from "../assets/image-me-5.png";
import imageMe6 from "../assets/image-me-6.png";

const heroImages = [imageMe1, imageMe2, imageMe3, imageMe4] as const;

const Home: FC = () => {
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  const currentImage = heroImages[heroImageIndex];

  const VISIBLE_CARD_COUNT = 3;
  const carouselCards = [
    { key: "hero", variant: "hero" as const },
    { key: "designer", variant: "designer" as const },
    { key: "developer", variant: "developer" as const },
    { key: "placeholder-1", variant: "placeholder" as const },
    { key: "placeholder-2", variant: "placeholder" as const },
    { key: "placeholder-3", variant: "placeholder" as const },
  ];

  const totalCards = carouselCards.length;
  const maxCarouselIndex = Math.max(totalCards - VISIBLE_CARD_COUNT, 0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const canScroll = totalCards > VISIBLE_CARD_COUNT;
  const isAtStart = carouselIndex === 0;
  const isAtEnd = carouselIndex === maxCarouselIndex;

  const showPrevious = () => {
    if (!canScroll || isAtStart) {
      return;
    }

    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  const showNext = () => {
    if (!canScroll || isAtEnd) {
      return;
    }

    setCarouselIndex((prev) => Math.min(prev + 1, maxCarouselIndex));
  };

  type CarouselCard = (typeof carouselCards)[number];

  const visibleCards = carouselCards.slice(
    carouselIndex,
    carouselIndex + VISIBLE_CARD_COUNT,
  );

  const leftPeekCard =
    canScroll && carouselIndex > 0
      ? carouselCards[carouselIndex - 1]
      : null;

  const rightPeekCard =
    canScroll && carouselIndex + VISIBLE_CARD_COUNT < totalCards
      ? carouselCards[carouselIndex + VISIBLE_CARD_COUNT]
      : null;

  const renderCardContent = (card: CarouselCard) => {
    switch (card.variant) {
      case "hero":
        return (
          <>
            <figure className="home-card__media">
              <img
                key={currentImage}
                className="home-card__image home-card__image--animated"
                src={currentImage}
                alt="Portrait of me"
              />
            </figure>
            <h1 className="home-card__heading">me.</h1>
          </>
        );
      case "designer":
        return (
          <>
            <figure className="home-card__media">
              <img
                src={imageMe5}
                alt="Illustration representing my design work"
                className="home-card__image"
              />
            </figure>
            <h1 className="home-card__heading">Designer.</h1>
          </>
        );
      case "developer":
        return (
          <>
            <figure className="home-card__media">
              <img
                src={imageMe6}
                alt="Illustration representing my development work"
                className="home-card__image"
              />
            </figure>
            <h1 className="home-card__heading">Developer.</h1>
          </>
        );
      default:
        return (
          <>
            <figure className="home-card__media">
              <div className="home-card__placeholder" aria-hidden="true">
                Coming Soon
              </div>
            </figure>
            <h1 className="home-card__heading">Placeholder.</h1>
          </>
        );
    }
  };

  const renderCard = (
    card: CarouselCard,
    index: number,
    {
      isPreview = false,
      extraClass = "",
      roleOverride,
      tabIndexOverride,
    }: {
      isPreview?: boolean;
      extraClass?: string;
      roleOverride?: "listitem" | "presentation";
      tabIndexOverride?: number;
    } = {},
  ) => {
    const classes = ["home-card"];
    if (card.variant === "hero") {
      classes.push("home-card--hero");
    }
    if (card.variant === "placeholder") {
      classes.push("home-card--placeholder");
    }
    if (isPreview) {
      classes.push("home-card--preview");
    }
    if (extraClass.trim()) {
      classes.push(extraClass.trim());
    }

    const role = roleOverride ?? (isPreview ? "presentation" : "listitem");
    const ariaHidden = isPreview ? true : undefined;
    const tabIndex = tabIndexOverride ?? (isPreview ? -1 : undefined);
    const key = `${card.key}-${index}${isPreview ? "-preview" : ""}`;

    return (
      <div
        className={classes.join(" ")}
        key={key}
        role={role}
        aria-hidden={ariaHidden}
        tabIndex={tabIndex}
      >
        {renderCardContent(card)}
      </div>
    );
  };

  return (
    <div className="home-carousel">
      <button
        type="button"
        className="home-carousel__button home-carousel__button--prev"
        onClick={showPrevious}
        aria-label="Show previous cards"
        disabled={!canScroll || isAtStart}
      >
        {"<"}
      </button>
      <div className="home-carousel__viewport">
        <div className="home-carousel__peek home-carousel__peek--left" aria-hidden="true">
          {leftPeekCard
            ? renderCard(leftPeekCard, carouselIndex - 1, {
                isPreview: true,
                roleOverride: "presentation",
                tabIndexOverride: -1,
              })
            : null}
        </div>
        <div className="home-carousel__track home-card-grid" role="list">
          {visibleCards.map((card, idx) => {
            const absoluteIndex = carouselIndex + idx;
            return renderCard(card, absoluteIndex);
          })}
        </div>
        <div className="home-carousel__peek home-carousel__peek--right" aria-hidden="true">
          {rightPeekCard
            ? renderCard(rightPeekCard, carouselIndex + VISIBLE_CARD_COUNT, {
                isPreview: true,
                roleOverride: "presentation",
                tabIndexOverride: -1,
              })
            : null}
        </div>
      </div>
      <button
        type="button"
        className="home-carousel__button home-carousel__button--next"
        onClick={showNext}
        aria-label="Show next cards"
        disabled={!canScroll || isAtEnd}
      >
        {">"}
      </button>
    </div>
  );
};

export default Home;
