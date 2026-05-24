import Image from "next/image";
import { Great_Vibes, Montserrat } from "next/font/google";
import HeroSlideshow from "@/app/components/HeroSlideshow";
import RsvpForm from "@/app/components/RsvpForm";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <>
   
      <section className="relative">
        <HeroSlideshow />

        <section>
          <div className="pointer-events-none absolute inset-0 z-10 flex -translate-y-10 items-center justify-center text-white">
          <div
            className={`${montserrat.className} relative w-full max-w-[600px] scale-90 text-center md:max-w-[820px] md:scale-60 lg:max-w-[900px] lg:scale-70`}
          >
            <Image
              src="/sunflower1.png"
              alt="Sunflower"
              width={736}
              height={736}
              className="relative z-0 mx-auto h-auto w-54 md:-top-0 md:w-64 lg:-top-0 lg:w-80"
            />

            {/* Date and time */}
            <div aria-label="Date and time" className="relative z-10">
              <div className="grid grid-cols-2 items-center gap-[clamp(8rem,20vw,14rem)] md:gap-[clamp(10rem,22vw,18rem)] lg:gap-[clamp(10rem,22vw,20rem)]">
                <div>
                  <div className="h-[1.5px] bg-white" />
                  <p className="py-2 text-xl font-medium tracking-[0.1em] md:py-2.5 md:text-3xl lg:text-4xl">
                    JUNE
                  </p>
                  <div className="h-[1.5px] bg-white" />
                </div>

                <div>
                  <div className="h-[1.5px] bg-white" />
                  <p className="whitespace-nowrap py-2 text-xl font-medium tracking-[0.1em] md:py-2.5 md:text-3xl lg:text-4xl">
                    5:00 PM
                  </p>
                  <div className="h-[1.5px] bg-white" />
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_8px_rgba(255,255,255,0.55)]">
                <p className="text-2xl font-medium tracking-[0.1em] drop-shadow-[0_0_5px_rgba(255,255,255,0.35)] md:text-4xl lg:text-5xl">
                  SATURDAY
                </p>
                <p className="text-7xl font-bold leading-none drop-shadow-[0_0_16px_rgba(255,255,255,0.95)] md:text-8xl lg:text-9xl">
                  27
                </p>
                <p className="text-2xl font-medium tracking-[0.1em] drop-shadow-[0_0_5px_rgba(255,255,255,0.35)] md:text-4xl lg:text-5xl">
                  2026
                </p>
              </div>
            </div>

            <p
              className={`${greatVibes.className} relative z-10 mt-10 lg:mt-20 text-7xl text-yellow-300 drop-shadow-[0_0_14px_rgba(253,224,71,0.9)] md:text-8xl lg:text-9xl`}
            >
              <span className="font-semibold">Mirasol</span>{" "}
              <span className="font-semibold text-6xl md:text-7xl lg:text-8xl">@</span>{" "}
              <span className="font-semibold text-8xl md:text-9xl lg:text-[10rem]">75</span>
            </p>
            <button
              type="button"
              className="relative z-10 mx-auto mt-6 flex h-12 items-center justify-center gap-3 rounded-full bg-green-200 px-12 text-base font-medium tracking-normal text-yellow-950 md:h-14 md:px-16 md:text-xl md:tracking-[0.04em] lg:h-16 lg:px-20 lg:text-2xl"
            >
              <span>RSVP</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 3.75v3M17 3.75v3M4.75 8.75h14.5M6.75 5.75h10.5a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2V7.75a2 2 0 0 1 2-2Zm4 9.25 1.5 1.5 3-3.25"
                />
              </svg>
            </button>
          </div>
          </div>
        </section>
        
      </section>
      <RsvpForm />
    </>
  );
}
