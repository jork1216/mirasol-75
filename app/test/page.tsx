import { Cormorant_Garamond, Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function TestPage() {
  return (
    <div className="relative">
      <div className="relative aspect-square w-full overflow-hidden md:inline-block md:aspect-auto md:w-fit">
        <img
          src="/lola-cover.png"
          alt="Lola cover"
          className="block h-full w-full -translate-y-[10%] -translate-x-[20%] scale-140 object-cover md:h-auto md:w-auto md:-translate-x-[10%] md:scale-120"
        />
        <div className="absolute top-[10%] left-[10%] z-10 text-center">
          <p className="text-[8px] font-medium tracking-[0.32em] text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.7)] md:text-[11px] lg:text-[18px]">
            PLEASE JOIN US FOR A
          </p>
          <p
            className={`${greatVibes.className} mt-2 text-[30px] leading-[0.9] text-[#f2c84b] [text-shadow:0_2px_4px_rgba(0,0,0,0.65)] md:mt-2.5 md:text-[42px] lg:mt-3 lg:text-[72px]`}
          >
            Birthday
            <br />
            Celebration
          </p>
          <div className="mx-auto mt-0 flex w-20 items-center gap-2 text-[#f2c84b] md:w-28 lg:mt-3 lg:w-36">
            <div className="h-0.5 flex-1 bg-[#f2c84b]" />
            <span className="text-sm md:text-base lg:text-xl">♥</span>
            <div className="h-0.5 flex-1 bg-[#f2c84b]" />
          </div>
          <p
            className={`${cormorant.className} mt-0 text-[60px] font-bold leading-[0.8] text-white [text-shadow:0_3px_5px_rgba(0,0,0,0.85)] md:mt-0 md:text-[88px] lg:mt-2 lg:text-[116px]`}
          >
            Mirasol
          </p>
          <p
          className={`${cormorant.className} -mt-4 text-[48px] font-bold italic leading-none text-[#f2c84b] [text-shadow:0_3px_5px_rgba(0,0,0,0.75)] md:text-[64px] lg:text-[112px]`}
        >
          @ <span className="text-[74px] md:text-[106px] lg:text-[148px]">75</span>
        </p>
        </div>
        <div className="absolute top-[175%] left-1/2 z-10 h-[190vw] w-[190vw] -translate-x-1/2 -translate-y-1/2 rounded-full border-6 border-yellow-400 bg-white md:top-[205%]" />
        <div className="absolute top-0 left-0 z-0 h-full w-[90vw] bg-gradient-to-r from-yellow-900/90 to-transparent" />
        <img
          src="/sunflower.png"
          alt="Sunflower"
          className="absolute top-[-15%] -left-20 z-30 w-40 rotate-90 md:w-40 lg:w-48"
        />
        <img
          src="/sunflower.png"
          alt="Sunflower"
          className="absolute top-[70%] -left-20 z-30 w-40 md:w-40 lg:w-48"
        />
      </div>
    </div>
  );
}
