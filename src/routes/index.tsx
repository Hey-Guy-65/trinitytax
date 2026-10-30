import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock,
  FileWarning,
  Gavel,
  HandCoins,
  Mail,
  MapPin,
  Phone,
  Receipt,
  ScrollText,
  ShieldCheck,
  Sparkle,
} from "lucide-react";

import heroImage from "@/assets/hero-office.jpg";
import logo from "@/assets/trinity-logo.png.asset.json";
import { ChatWidget } from "@/components/ChatWidget";
import { GoogleMap } from "@/components/GoogleMap";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trinity Tax Consultants Inc. | IRS Tax Resolution in Las Vegas" },
      {
        name: "description",
        content:
          "Enrolled Agents in Las Vegas resolving IRS debt, back taxes, liens and audits for over four decades. Free, confidential consultation.",
      },
      { property: "og:title", content: "Trinity Tax Consultants Inc. | IRS Tax Resolution" },
      {
        property: "og:description",
        content:
          "Four decades of IRS representation by Enrolled Agents. Back taxes, levies, liens, audits and year-round tax planning in Las Vegas, NV.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Visit", href: "#visit" },
];

const SERVICES = [
  {
    icon: FileWarning,
    title: "IRS Notices & Back Taxes",
    body: "Unfiled returns, CP2000s, LT11 final notices — we respond, file, and bring you back into compliance.",
  },
  {
    icon: HandCoins,
    title: "Offers in Compromise",
    body: "When settling for less than the full balance is realistic, we build and defend the case for it.",
  },
  {
    icon: ShieldCheck,
    title: "Levy & Garnishment Relief",
    body: "Wage garnishments and bank levies are urgent. We move fast to stop collection action.",
  },
  {
    icon: ScrollText,
    title: "Liens & Payment Plans",
    body: "Lien withdrawals, installment agreements, and currently-not-collectible status structured to fit your budget.",
  },
  {
    icon: Gavel,
    title: "Audit Representation",
    body: "Our Enrolled Agents appear before the IRS on your behalf so you never face an examiner alone.",
  },
  {
    icon: Receipt,
    title: "Preparation & Planning",
    body: "Individual, business and payroll tax filings, plus year-round planning to keep problems from returning.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Free consultation",
    body: "Tell us what you're facing. We review notices, balances and deadlines — no cost, no obligation.",
  },
  {
    step: "02",
    title: "Investigation",
    body: "We pull your IRS transcripts and map the full picture: what's owed, what's missing, what's coming.",
  },
  {
    step: "03",
    title: "Resolution",
    body: "We negotiate directly with the IRS and pursue the strongest available outcome for your situation.",
  },
  {
    step: "04",
    title: "Prevention",
    body: "Once resolved, we set up filing and planning habits so you stay clear of future trouble.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo.url} alt="Trinity Tax Consultants Inc. logo" className="size-11" />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-base font-semibold">
                Trinity Tax Consultants
              </span>
              <span className="eyebrow block text-[10px] text-muted-foreground">
                Enrolled Agents · Las Vegas
              </span>
            </span>
          </a>
          <nav className="ml-auto hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild variant="gold" size="default" className="ml-auto md:ml-0">
            <a href="tel:+17028403808">
              <Phone /> (702) 840-3808
            </a>
          </Button>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
          <img
            src={heroImage}
            alt="Trinity Tax Consultants office interior"
            width={1600}
            height={1100}
            className="absolute inset-0 size-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[image:var(--gradient-ink)] opacity-80" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-32">
            <div>
              <p className="eyebrow text-accent">Serving taxpayers since 1984</p>
              <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                The IRS has a process.
                <span className="block text-accent">We know it by heart.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-foreground/80">
                Trinity Tax Consultants resolves IRS matters efficiently — and keeps them from
                coming back. Our Enrolled Agents handle every call, letter and negotiation on your
                behalf.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="xl">
                  <a href="#visit">
                    Get a free consultation <ArrowRight />
                  </a>
                </Button>
                <Button asChild variant="onDark" size="xl">
                  <a href="#services">See how we help</a>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-foreground/70">
                <span className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-accent" /> Authorized to Practice Before the IRS
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-accent" /> Confidential case review
                </span>
              </div>
            </div>

            <div className="justify-self-center">
              <img
                src={logo.url}
                alt="Trinity Tax Consultants Inc."
                className="w-56 drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)] md:w-72"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3">
            {[
              { value: "40+", label: "Years resolving tax matters" },
              { value: "Enrolled", label: "Agents authorized before the IRS" },
              { value: "Free", label: "Initial consultation, always" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-display text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Client portals */}
        <section className="mx-auto max-w-6xl px-5 pt-20">
          <div className="rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <p className="eyebrow text-muted-foreground">Existing clients</p>
              <div className="gold-rule mt-4" />
              <h2 className="mt-5 text-2xl sm:text-3xl">Client resources</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Access your secure client portal or book a time to speak with us.
              </p>
            </div>
            <div className="mt-6 flex w-full flex-col gap-3 md:mt-0 md:w-80 md:shrink-0">
              <Button asChild variant="gold" size="xl" className="w-full">
                <a
                  href="https://trinitytaxlv.clientportal.com/#/login?redirect_url=https%3A%2F%2Ftrinitytaxlv.clientportal.com%2F"
                  target="_blank"
                  rel="noreferrer"
                >
                  Canopy Client Login Portal <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="default" size="xl" className="w-full">
                <a
                  href="https://scheduler.zoom.us/d/imp1mylq/appointment-with-ea"
                  target="_blank"
                  rel="noreferrer"
                >
                  Zoom Scheduler <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-24">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-muted-foreground">About us</p>
              <div className="gold-rule mt-4" />
              <h2 className="mt-6 text-3xl sm:text-4xl">
                Four decades of standing between you and the IRS
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                For over four decades, we have been dedicated to helping individuals and businesses
                navigate complex tax issues and regain financial stability. Our mission is to
                resolve IRS matters efficiently while providing guidance to prevent future tax
                challenges.
              </p>
              <p>
                Our team of Enrolled Agents, authorized to represent clients before the IRS,
                advocates on your behalf, handling all communications and negotiations. With our
                expertise, you can focus on your future while we work toward the best possible
                resolution for your tax concerns.
              </p>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-base text-foreground">
                <Sparkle className="size-5 shrink-0 text-accent" />
                <p>
                  Have a quick question right now? Our AI assistant, Ellie, is available in the
                  corner of this page any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-secondary py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="eyebrow text-muted-foreground">What we do</p>
            <div className="gold-rule mt-4" />
            <h2 className="mt-6 max-w-2xl text-3xl sm:text-4xl">
              Representation for every stage of a tax problem
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <article
                  key={service.title}
                  className="group rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-accent"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-[image:var(--gradient-gold)] text-accent-foreground">
                    <service.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-xl">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-6xl px-5 py-24">
          <p className="eyebrow text-muted-foreground">Our process</p>
          <div className="gold-rule mt-4" />
          <h2 className="mt-6 max-w-2xl text-3xl sm:text-4xl">
            Clear steps, no surprises, no IRS phone calls for you
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {PROCESS.map((item) => (
              <li key={item.step} className="border-t-2 border-accent pt-5">
                <span className="font-display text-2xl font-semibold text-accent">{item.step}</span>
                <h3 className="mt-2 text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Visit / Map */}
        <section id="visit" className="bg-ink py-24 text-ink-foreground">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-accent">Visit or call</p>
              <div className="gold-rule mt-4" />
              <h2 className="mt-6 text-3xl sm:text-4xl">Our Las Vegas office</h2>
              <p className="mt-4 max-w-md text-ink-foreground/75">
                Sit down with an Enrolled Agent in person, or start with a phone call. Either way,
                the first conversation is free and confidential.
              </p>

              <dl className="mt-8 space-y-5 text-sm">
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold">Address</dt>
                    <dd className="text-ink-foreground/75">
                      8485 W Sunset Road, Suite 206
                      <br />
                      Las Vegas, NV 89113
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold">Phone</dt>
                    <dd>
                      <a
                        className="text-ink-foreground/75 hover:text-accent"
                        href="tel:+17028403808"
                      >
                        (702) 840-3808
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold">Email</dt>
                    <dd>
                      <a
                        className="text-ink-foreground/75 hover:text-accent"
                        href="mailto:taxhelp@trinitytaxlv.com"
                      >
                        taxhelp@trinitytaxlv.com
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-semibold">Hours</dt>
                    <dd className="text-ink-foreground/75">Monday – Friday, 9:00 AM – 5:00 PM PT</dd>
                  </div>
                </div>
              </dl>

              <Button asChild variant="gold" size="xl" className="mt-9">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=8485+W+Sunset+Road+Suite+206,+Las+Vegas,+NV+89113"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions <ArrowRight />
                </a>
              </Button>
            </div>

            <div className="h-[420px] overflow-hidden rounded-xl border border-accent/25 shadow-[var(--shadow-lift)]">
              <GoogleMap />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" className="size-10" />
            <div>
              <p className="font-display font-semibold">Trinity Tax Consultants Inc.</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Building2 className="size-3" /> 8485 W Sunset Road, Las Vegas, NV
              </p>
            </div>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            © {new Date().getFullYear()} Trinity Tax Consultants Inc. Information on this site is
            general in nature and is not tax or legal advice. Sample website for demonstration.
          </p>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
