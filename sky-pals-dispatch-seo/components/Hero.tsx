import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cloud, MapPin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="cloud-bg relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="absolute left-[8%] top-16 text-white/80" aria-hidden="true">
        <Cloud className="h-20 w-20" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-bold text-slateblue">
            <Sparkles className="h-4 w-4 text-coral" />
            Professional drone support with a friendlier approach
          </div>
          <p className="mt-8 text-sm font-black uppercase tracking-[.25em] text-slateblue">Sky Pals Dispatch</p>
          <h1 className="mt-3 text-5xl font-black leading-[.95] tracking-[-.05em] text-ink sm:text-6xl">
            Professional Drone Services
            <br />
            <span className="text-slateblue">in Northeastern Pennsylvania</span>
          </h1>
          <p className="mt-6 max-w-xl text-2xl font-bold leading-tight text-ink sm:text-3xl">Your friendly eyes in the sky.</p>
          <p className="mt-5 max-w-xl text-base leading-7 text-steel sm:text-lg">
            FAA Part 107 aerial photography, roof documentation, inspections,
            mapping, and site imagery across Wilkes-Barre and Scranton, including
            Luzerne County, Lackawanna County, and communities throughout
            Northeastern Pennsylvania.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-4 font-black text-white shadow-soft transition hover:-translate-y-1 hover:bg-ink">
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="focus-ring rounded-full border-2 border-ink bg-white px-6 py-4 text-center font-black transition hover:bg-sunbeam">
              Explore services
            </Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-steel">
            <MapPin className="h-4 w-4 text-field" />
            Based in Wilkes-Barre and serving Northeastern Pennsylvania
          </p>
        </div>

        <div className="relative min-h-[420px]">
          <div className="absolute inset-4 rotate-3 rounded-[3rem] bg-sunbeam/70" aria-hidden="true" />
          <figure className="soft-card absolute inset-0 overflow-hidden bg-white">
            <Image
              src="/images/hero-drone-selected.png"
              alt="Camera drone flying above a green valley and city"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="object-cover object-[72%_center] sm:object-center"
            />
            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-wider text-slateblue shadow-sm backdrop-blur">
              Professional aerial services
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-6 pb-6 pt-20 text-white sm:px-8 sm:pb-8">
              <p className="text-xs font-black uppercase tracking-[.2em] text-sunbeam">A better view, put to work</p>
              <p className="mt-2 text-2xl font-black">Clear imagery. Useful context.</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">Photography · Documentation · Inspection support · Site imagery</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
