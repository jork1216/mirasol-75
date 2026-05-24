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
    <div>
      <div className="relative inline-block w-fit overflow-hidden">
        <img
          src="/lola-cover.png"
          alt="Lola cover"
          className="block -translate-y-[10%] scale-120"
        />
        <div className="absolute top-[9%] left-[7%] z-10 text-center">
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
          <p
            className={`${cormorant.className} mt-4 text-[48px] font-bold leading-[0.8] text-white [text-shadow:0_3px_5px_rgba(0,0,0,0.85)] md:mt-5 md:text-[68px] lg:mt-7 lg:text-[116px]`}
          >
            Mirasol
          </p>
          <p
            className={`${cormorant.className} -mt-1 text-[48px] font-bold italic leading-none text-[#f2c84b] [text-shadow:0_3px_5px_rgba(0,0,0,0.75)] md:text-[64px] lg:text-[112px]`}
          >
            @ 75
          </p>
        </div>
        <div className="absolute top-[175%] left-1/2 z-10 h-[150vw] w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full border-6 border-yellow-400 bg-white" />
        <div className="absolute top-0 left-0 z-0 h-full w-[90vw] bg-gradient-to-r from-yellow-900/90 to-transparent" />
      </div>
    </div>
  );
}
