import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import suite from "@/assets/3.jpg";
import dining from "@/assets/1.jpg";
import spa from "@/assets/16.jpg";
import hightea from "@/assets/10.jpg";
import voucher from "@/assets/15.jpg";
import pool from "@/assets/8.jpg";
import couple from "@/assets/12.jpg";
import breakfast from "@/assets/4.jpg";
import garden from "@/assets/13.jpg";
import hero from "@/assets/14.jpg";

import { Reveal } from "./Reveal";

const images = [
  {
    src: suite,
    caption: "Luxury suite experience",
  },
  {
    src: dining,
    caption: "Dining experience",
  },
  {
    src: hightea,
    caption: "High tea experience",
  },
  {
    src: spa,
    caption: "Unique spa experience",
  },
  {
    src: hero,
    caption: "A night away at De LUSH",
  },
  {
    src: couple,
    caption: "Moments worth remembering",
  },
  {
    src: breakfast,
    caption: "Slow mornings",
  },
  {
    src: voucher,
    caption: "The De LUSH Gift Voucher",
  },
  {
    src: pool,
    caption: "Poolside relaxation",
  },
  {
    src: garden,
    caption: "Peaceful surroundings",
  },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
  }, []);

  // Open fullscreen image
  const openImage = useCallback((index: number) => {
    setOpen(index);
  }, []);

  // Fullscreen keyboard navigation
  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }

      if (e.key === "ArrowRight") {
        setOpen((i) =>
          i === null ? i : (i + 1) % images.length,
        );
      }

      if (e.key === "ArrowLeft") {
        setOpen((i) =>
          i === null ? i : (i - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  /*
   * Keep the selected slide centered.
   *
   * IMPORTANT:
   * Do NOT use slide.scrollIntoView() here.
   * scrollIntoView() can scroll the entire page vertically
   * and cause the browser to jump down to the Gallery section.
   *
   * Instead, we only scroll the horizontal gallery container.
   */
  useEffect(() => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const slide = container.children[current] as HTMLElement | undefined;

    if (!slide) return;

    const targetScrollLeft =
      slide.offsetLeft -
      container.clientWidth / 2 +
      slide.clientWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  }, [current]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <Reveal className="text-center">
          <p className="text-[0.68rem] tracking-[0.34em] text-muted-foreground uppercase">
            A look inside
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl">
            What your gift{" "}
            <span className="text-gold-gradient italic">
              includes
            </span>
          </h2>

          <div className="rule-gold mx-auto mt-7 w-40" />
        </Reveal>

        {/* Slider */}
        <div className="relative mt-14">

          {/* Previous */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="
              glass-dark absolute left-2 top-1/2 z-20
              -translate-y-1/2 rounded-full p-3
              text-primary-foreground shadow-lg
              transition-all duration-300
              hover:scale-110
              sm:left-4
            "
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Slides */}
          <div
            ref={sliderRef}
            className="
              flex
              snap-x snap-mandatory
              gap-5
              overflow-x-auto
              scroll-smooth
              px-[8%]
              pb-4
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;

              const dx =
                e.changedTouches[0].clientX - touchX.current;

              if (dx < -50) {
                next();
              }

              if (dx > 50) {
                prev();
              }

              touchX.current = null;
            }}
          >
            {images.map((img, index) => (
              <div
                key={`${img.src}-${index}`}
                className="
                  group
                  relative
                  min-w-[82%]
                  snap-center
                  sm:min-w-[60%]
                  md:min-w-[45%]
                  lg:min-w-[38%]
                  xl:min-w-[32%]
                "
              >
                <button
                  onClick={() => openImage(index)}
                  aria-label={`Open ${img.caption}`}
                  className="
                    relative
                    block
                    aspect-[4/5]
                    w-full
                    overflow-hidden
                    rounded-2xl
                    shadow-soft
                  "
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  {/* Overlay */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, oklch(0.22 0.03 45 / 0.8))",
                    }}
                  />

                  {/* Caption */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      bottom-5
                      left-5
                      right-5
                      translate-y-3
                      text-left
                      text-sm
                      tracking-wide
                      text-primary-foreground
                      opacity-0
                      transition-all
                      duration-500
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    {img.caption}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next image"
            className="
              glass-dark absolute right-2 top-1/2 z-20
              -translate-y-1/2 rounded-full p-3
              text-primary-foreground shadow-lg
              transition-all duration-300
              hover:scale-110
              sm:right-4
            "
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-300
                ${
                  current === index
                    ? "w-8 bg-gold"
                    : "w-2 bg-muted-foreground/40"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {open !== null && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-ink/92
            p-4
            backdrop-blur-md
            animate-in
            fade-in
            duration-300
          "
          role="dialog"
          aria-modal="true"
          onClick={close}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;

            const dx =
              e.changedTouches[0].clientX - touchX.current;

            if (dx < -50) {
              setOpen(
                (i) =>
                  i === null
                    ? i
                    : (i + 1) % images.length,
              );
            }

            if (dx > 50) {
              setOpen(
                (i) =>
                  i === null
                    ? i
                    : (i - 1 + images.length) % images.length,
              );
            }

            touchX.current = null;
          }}
        >
          {/* Close */}
          <button
            onClick={close}
            aria-label="Close gallery"
            className="
              absolute
              right-5
              top-5
              z-20
              rounded-full
              p-3
              text-primary-foreground/80
              transition-colors
              hover:text-primary-foreground
            "
          >
            <X className="size-6" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpen(
                (i) =>
                  i === null
                    ? i
                    : (i - 1 + images.length) % images.length,
              );
            }}
            aria-label="Previous image"
            className="
              glass-dark
              absolute
              left-4
              z-20
              rounded-full
              p-3
              text-primary-foreground
              sm:left-8
            "
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Image */}
          <figure
            className="
              max-h-[85svh]
              max-w-5xl
              animate-in
              zoom-in-95
              duration-300
            "
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[open].src}
              alt={images[open].caption}
              className="
                max-h-[75svh]
                w-full
                rounded-2xl
                object-contain
              "
            />

            <figcaption
              className="
                mt-4
                text-center
                text-sm
                tracking-wide
                text-primary-foreground/80
              "
            >
              {images[open].caption} · {open + 1} /{" "}
              {images.length}
            </figcaption>
          </figure>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpen(
                (i) =>
                  i === null
                    ? i
                    : (i + 1) % images.length,
              );
            }}
            aria-label="Next image"
            className="
              glass-dark
              absolute
              right-4
              z-20
              rounded-full
              p-3
              text-primary-foreground
              sm:right-8
            "
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  );
}
