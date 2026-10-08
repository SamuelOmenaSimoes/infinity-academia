import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Menu, X, MapPin, Phone, Instagram } from "lucide-react";
import logo from "@/assets/infinity-logo.png.asset.json";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import floor from "@/assets/gym-floor.jpg";
import weights from "@/assets/weights.jpg";
import ambient from "@/assets/ambient.jpg";
import rack from "@/assets/rack.jpg";
import finalImg from "@/assets/final.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infinity Academia Itajubá — Supere seus limites" },
      {
        name: "description",
        content:
          "Infinity Academia em Itajubá, MG. Musculação, estrutura moderna e horários flexíveis. Fale pelo WhatsApp e comece agora.",
      },
      { property: "og:title", content: "Infinity Academia Itajubá — Supere seus limites" },
      {
        property: "og:description",
        content: "Seu treino. Sua evolução. Sem limites. Conheça a Infinity Academia em Itajubá.",
      },
    ],
  }),
  component: Index,
});

const PHONE = "5535999117540";
const WA_MSG = "Olá! Conheci a Infinity pelo site e gostaria de saber mais sobre os planos.";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MSG)}`;
const ADDRESS = "Avenida Clemente Teodoro da Silva, 924, Vila Isabel, Itajubá - MG, 37505-177";
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
// TODO: substituir pelo Instagram oficial da Infinity
const INSTAGRAM_URL = "https://www.instagram.com/";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "A Academia", href: "#academia" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Planos", href: "#planos" },
  { label: "Horários", href: "#horarios" },
  { label: "Contato", href: "#contato" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CTA({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "whatsapp";
  external?: boolean;
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-foreground",
    ghost: "border border-foreground/40 text-foreground hover:border-primary hover:text-primary",
    whatsapp: "bg-whatsapp text-ink hover:bg-foreground",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 ${styles}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
      <span className="h-px w-10 bg-primary" />
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-border bg-ink/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-10">
        <a href="#inicio" className="flex shrink-0 items-center" aria-label="Infinity Academia">
          <img src={logo.url} alt="Infinity Academia" className="h-14 w-14 object-contain" />
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:text-foreground hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-foreground sm:px-6 sm:py-3 sm:text-xs"
          >
            Comece agora
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-foreground lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-ink px-5 pb-8 pt-4 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-display text-3xl uppercase text-foreground hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <img
        src={hero}
        alt="Atleta treinando levantamento terra na academia"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] motion-safe:animate-[heroZoom_14s_ease-out_forwards]"
      />
      <div className="absolute inset-0 overlay-hero" />
      <div className="absolute inset-0 overlay-bottom" />
      <style>{`@keyframes heroZoom{from{transform:scale(1.08)}to{transform:scale(1)}}`}</style>
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:pb-24 lg:px-10">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/80">
          Infinity Academia <span className="text-primary">•</span> Itajubá
        </p>
        <h1 className="font-display text-[19vw] uppercase leading-[0.86] text-foreground sm:text-[8.5rem] lg:text-[10rem]">
          Supere seus
          <br />
          <span className="text-primary">limites.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg text-foreground/80 sm:text-xl">
          Seu treino. Sua evolução. Sem limites.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <CTA href={WA_URL} external>
            Comece agora
          </CTA>
          <CTA href="#academia" variant="ghost">
            Conheça a academia
          </CTA>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Treine", "Evolua", "Supere", "Repita"];
  const row = [...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-border bg-ink py-7 sm:py-10">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((w, i) => (
              <span key={i} className="flex items-center">
                <span
                  className={`px-6 font-display text-5xl uppercase sm:px-10 sm:text-7xl ${
                    i % 2 ? "text-stroke" : "text-foreground"
                  }`}
                >
                  {w}
                </span>
                <span className="h-2 w-2 rounded-full bg-primary" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="academia" className="bg-background py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="reveal relative lg:col-span-6">
          <div className="overflow-hidden">
            <img
              src={about}
              alt="Aluna treinando com halteres"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.5s] hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden h-32 w-32 border-b-2 border-r-2 border-primary sm:block" />
        </div>
        <div className="reveal lg:col-span-5 lg:col-start-8">
          <Eyebrow>A Infinity</Eyebrow>
          <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
            Seu objetivo
            <br />
            não tem <span className="text-primary">limite.</span>
          </h2>
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              A Infinity Academia é um espaço em Itajubá pensado para quem quer treinar com
              constância e ver resultado de verdade.
            </p>
            <p>
              Uma academia acessível, moderna e focada no que importa: a sua evolução, treino
              após treino — seja qual for o seu ponto de partida.
            </p>
          </div>
          <div className="mt-10">
            <CTA href="#estrutura" variant="ghost">
              Ver a estrutura
            </CTA>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryImg({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`reveal group relative overflow-hidden bg-card ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground">
          {label}
        </span>
        <span className="h-px w-8 bg-primary transition-all duration-500 group-hover:w-16" />
      </figcaption>
    </figure>
  );
}

function Structure() {
  return (
    <section id="estrutura" className="bg-ink py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="reveal mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Estrutura</Eyebrow>
            <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
              Um espaço feito
              <br />
              para <span className="text-primary">evoluir.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Equipamentos, pesos e ambiente preparados para cada fase do seu treino.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[300px_300px_280px]">
          <GalleryImg
            src={floor}
            alt="Área de musculação com máquinas"
            label="Musculação"
            className="col-span-2 aspect-[16/10] lg:col-span-8 lg:row-span-2 lg:aspect-auto"
          />
          <GalleryImg
            src={weights}
            alt="Halteres alinhados no suporte"
            label="Pesos livres"
            className="aspect-[3/4] lg:col-span-4 lg:row-span-2 lg:aspect-auto"
          />
          <GalleryImg
            src={rack}
            alt="Rack de agachamento com barra"
            label="Equipamentos"
            className="aspect-[3/4] lg:col-span-5 lg:aspect-auto"
          />
          <GalleryImg
            src={ambient}
            alt="Área de cardio com esteiras"
            label="Ambiente"
            className="col-span-2 aspect-[16/10] lg:col-span-7 lg:aspect-auto"
          />
        </div>
      </div>
    </section>
  );
}

// Edite aqui os planos reais da Infinity. Os valores abaixo são placeholders.
const PLANS = [
  { name: "Plano Mensal", price: "R$ --,--", period: "/mês", note: "[Descrição do plano]" },
  { name: "Plano Trimestral", price: "R$ --,--", period: "/mês", note: "[Descrição do plano]" },
  { name: "Plano Anual", price: "R$ --,--", period: "/mês", note: "[Descrição do plano]" },
];

function Plans() {
  return (
    <section id="planos" className="bg-background py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-10">
        <div className="reveal lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Planos</Eyebrow>
            <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-7xl">
              Comece a
              <br />
              <span className="text-primary">treinar.</span>
            </h2>
            <p className="mt-8 max-w-sm text-muted-foreground">
              Escolha o plano e fale com a gente pelo WhatsApp. Simples assim.
            </p>
          </div>
        </div>
        <div className="lg:col-span-8">
          {PLANS.map((p, i) => (
            <a
              key={p.name}
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-6 gap-y-4 border-t border-border py-10 transition-colors last:border-b sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-x-10"
            >
              <span className="font-display text-2xl text-primary">0{i + 1}</span>
              <div className="min-w-0">
                <h3 className="font-display text-4xl uppercase leading-none transition-colors group-hover:text-primary sm:text-5xl">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.note}</p>
              </div>
              <div className="col-start-2 sm:col-start-auto">
                <span className="font-display text-4xl">{p.price}</span>
                <span className="ml-1 text-sm text-muted-foreground">{p.period}</span>
              </div>
              <span className="col-start-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary sm:col-start-auto">
                Quero começar
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hours() {
  return (
    <section id="horarios" className="relative overflow-hidden bg-ink py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="reveal">
          <Eyebrow>Horários</Eyebrow>
          <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
            Treine no seu <span className="text-primary">horário.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-0 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal border-t border-primary pt-8 lg:pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Segunda a sexta
            </p>
            <p className="mt-6 font-display text-6xl leading-none sm:text-8xl lg:text-9xl">
              06:00<span className="text-primary"> — </span>11:00
            </p>
            <p className="mt-4 font-display text-6xl leading-none sm:text-8xl lg:text-9xl">
              13:00<span className="text-primary"> — </span>21:00
            </p>
          </div>
          <div className="reveal mt-14 border-t border-border pt-8 lg:mt-0 lg:border-l lg:pl-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Sábado
            </p>
            <p className="mt-6 font-display text-6xl leading-none sm:text-8xl lg:text-9xl">
              09:00<span className="text-primary"> — </span>12:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="localizacao" className="bg-background">
      <div className="grid lg:grid-cols-2">
        <div className="reveal mx-auto flex w-full max-w-2xl flex-col justify-center px-5 py-24 sm:py-32 lg:px-16">
          <Eyebrow>Localização</Eyebrow>
          <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-7xl">
            Pertinho de você
            <br />
            em <span className="text-primary">Itajubá.</span>
          </h2>
          <address className="mt-10 border-l-2 border-primary pl-6 text-lg not-italic leading-relaxed text-muted-foreground">
            <strong className="block font-semibold text-foreground">Infinity Academia</strong>
            Avenida Clemente Teodoro da Silva, 924
            <br />
            Vila Isabel
            <br />
            Itajubá — MG
            <br />
            CEP 37505-177
          </address>
          <div className="mt-10">
            <CTA href={MAPS_URL} external>
              Como chegar
            </CTA>
          </div>
        </div>
        <div className="min-h-[380px] lg:min-h-[640px]">
          <iframe
            title="Mapa da Infinity Academia"
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[380px] w-full border-0 grayscale invert-[0.9] hue-rotate-180 lg:min-h-[640px]"
          />
        </div>
      </div>
    </section>
  );
}

function WhatsApp() {
  return (
    <section id="contato" className="border-t border-border bg-ink py-24 sm:py-36">
      <div className="reveal mx-auto grid max-w-7xl items-end gap-12 px-5 lg:grid-cols-[1.3fr_1fr] lg:px-10">
        <h2 className="font-display text-7xl uppercase leading-[0.86] sm:text-8xl lg:text-[9rem]">
          Pronto para
          <br />
          <span className="text-primary">começar?</span>
        </h2>
        <div>
          <p className="text-lg text-muted-foreground">
            Fale com a Infinity e venha conhecer a academia.
          </p>
          <a
            href={`tel:+${PHONE}`}
            className="mt-6 block font-display text-4xl tracking-wide transition-colors hover:text-primary sm:text-5xl"
          >
            (35) 99911-7540
          </a>
          <div className="mt-8">
            <CTA href={WA_URL} variant="whatsapp" external>
              Falar no WhatsApp
            </CTA>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink">
      <img
        src={finalImg}
        alt="Atleta treinando com cordas navais"
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-[75%_center]"
      />
      <div className="absolute inset-0 overlay-hero" />
      <div className="reveal relative mx-auto w-full max-w-7xl px-5 py-24 lg:px-10">
        <h2 className="max-w-4xl font-display text-6xl uppercase leading-[0.88] sm:text-8xl lg:text-9xl">
          Não coloque limites
          <br />
          na sua <span className="text-primary">evolução.</span>
        </h2>
        <div className="mt-12">
          <CTA href={WA_URL} external>
            Comece agora
          </CTA>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { label: "Academia", href: "#academia" },
    { label: "Estrutura", href: "#estrutura" },
    { label: "Planos", href: "#planos" },
    { label: "Horários", href: "#horarios" },
    { label: "Localização", href: "#localizacao" },
    { label: "Contato", href: "#contato" },
  ];
  return (
    <footer className="border-t border-border bg-ink pb-28 pt-16 sm:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[auto_1fr_auto] md:gap-20 lg:px-10">
        <img src={logo.url} alt="Infinity Academia" className="h-28 w-28 object-contain" />
        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p className="flex gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span>
              Avenida Clemente Teodoro da Silva, 924
              <br />
              Vila Isabel — Itajubá/MG
            </span>
          </p>
          <a href={`tel:+${PHONE}`} className="flex gap-3 hover:text-foreground">
            <Phone className="h-4 w-4 text-primary" /> (35) 99911-7540
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 hover:text-foreground"
          >
            <Instagram className="h-4 w-4 text-primary" /> Instagram
          </a>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-7xl border-t border-border px-5 pt-6 text-xs text-muted-foreground lg:px-10">
        © {new Date().getFullYear()} Infinity Academia. Itajubá — MG.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42zm8.02-17.45A11.33 11.33 0 0 0 12.04.75C5.79.75.7 5.83.7 12.08c0 2 .52 3.95 1.52 5.66L.6 23.25l5.64-1.48a11.3 11.3 0 0 0 5.8 1.48h.01c6.25 0 11.33-5.08 11.34-11.33 0-3.03-1.18-5.87-3.32-8.01z" />
      </svg>
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <main className="bg-background font-sans text-foreground">
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Structure />
      <Plans />
      <Hours />
      <Location />
      <WhatsApp />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
