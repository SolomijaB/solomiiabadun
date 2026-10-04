import Image from "next/image";
import Link from "next/link";
import { IconArrowDown, IconCheck, IconMail, IconSend } from "@tabler/icons-react";
import { getSiteCopy, siteConfig, type Locale } from "@/content/site";
import { createStructuredData, serializeStructuredData } from "@/lib/structured-data";
import { BrandLogo } from "./brand-logo";
import { ConsentSettingsButton } from "./consent";
import { ContactForm } from "./contact-form";
import { BrandIcon, CrownIcon, InstagramIcon } from "./icon";
import { Reveal } from "./reveal";
import { SiteHeader } from "./site-header";

const legalPaths = {
  de: { notice: "/impressum", privacy: "/datenschutz" },
  en: { notice: "/en/legal-notice", privacy: "/en/privacy" },
} as const;

function CtaLink({ children, href, variant = "peach", small = false }: { children: React.ReactNode; href: string; variant?: "peach" | "dark" | "outline"; small?: boolean }) {
  return (
    <a
      className={`button button--${variant}${small ? " button--small" : ""}`}
      href={href}
    >
      <IconSend aria-hidden="true" size={17} stroke={1.7} />
      <span>{children}</span>
    </a>
  );
}

export function MarketingPage({ locale }: { locale: Locale }) {
  const copy = getSiteCopy(locale);
  const approachId = locale === "de" ? "ansatz" : "approach";
  const aboutId = locale === "de" ? "ueber-mich" : "about";
  const contactHref = `#${copy.contact.id}`;
  const structuredData = createStructuredData(locale);
  return (
    <>
      <a className="skip-link" href="#main">{locale === "de" ? "Zum Inhalt springen" : "Skip to content"}</a>
      <SiteHeader copy={copy} />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__inner shell">
            <div className="hero__copy">
              <p className="eyebrow hero__eyebrow">{copy.hero.eyebrow}</p>
              <h1 id="hero-title" className="hero__title">
                <span>{copy.hero.lines[0]}</span>
                <span>{copy.hero.lines[1]}</span>
                <em>{copy.hero.lines[2]}</em>
              </h1>
              <p className="hero__body">{copy.hero.body}</p>
              <div className="hero__actions">
                <CtaLink href={contactHref}>{copy.hero.primaryCta}</CtaLink>
                <a className="text-link" href="#coaching">
                  {copy.hero.secondaryCta}
                  <IconArrowDown aria-hidden="true" size={17} stroke={1.6} />
                </a>
              </div>
              <p className="hero__microclaim">Strong body. Strong mind. Free life.</p>
            </div>

            <div className="hero__visual">
              <div className="hero__image-frame">
                <Image
                  src="/images/solomiia/strength-training.jpeg"
                  alt={copy.hero.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 46vw"
                  className="media-image"
                />
                <span className="hero__image-caption">Strength · intention · freedom</span>
              </div>
              <div className="hero__stamp" aria-hidden="true">
                <CrownIcon size={21} />
                <span>Movement<br />builds freedom</span>
              </div>
            </div>
          </div>
        </section>

        <div className="positioning-strip" aria-label={locale === "de" ? "Positionierung" : "Positioning"}>
          <div className="shell positioning-strip__inner">
            {copy.positioning.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <section className="section pillars" id={approachId} aria-labelledby="pillars-title">
          <div className="shell">
            <Reveal>
              <div className="section-heading section-heading--split">
                <div>
                  <p className="eyebrow">{copy.pillars.eyebrow}</p>
                  <h2 id="pillars-title">{copy.pillars.title}<br /><em>{copy.pillars.accent}</em></h2>
                </div>
                <p className="section-number" aria-hidden="true">01</p>
              </div>
            </Reveal>
            <div className="pillar-grid">
              {copy.pillars.items.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <article className="pillar-card">
                    <span className="icon-disc"><BrandIcon name={item.icon} size={31} /></span>
                    <p className="pillar-card__number">0{index + 1}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id={aboutId} aria-labelledby="about-title">
          <div className="shell about__grid">
            <Reveal className="about__visual">
              <div className="about__image-frame">
                <Image
                  src="/images/solomiia/portrait.jpeg"
                  alt={copy.about.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 43vw"
                  className="media-image"
                />
              </div>
              <p className="about__image-note">12 years dance · 10 years strength</p>
            </Reveal>

            <div className="about__copy">
              <Reveal>
                <p className="eyebrow">{copy.about.eyebrow}</p>
                <h2 id="about-title">{copy.about.title}<br /><em>{copy.about.accent}</em></h2>
              </Reveal>
              {copy.about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 80}><p className="about__paragraph">{paragraph}</p></Reveal>
              ))}
              <dl className="fact-list">
                {copy.about.facts.map((fact) => (
                  <div className="fact-list__item" key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="section offers" id="coaching" aria-labelledby="offers-title">
          <div className="shell">
            <Reveal>
              <div className="section-heading section-heading--offers">
                <div>
                  <p className="eyebrow">{copy.offers.eyebrow}</p>
                  <h2 id="offers-title">{copy.offers.title}</h2>
                </div>
                <p>{copy.offers.intro}</p>
              </div>
            </Reveal>
            <div className="offer-grid">
              {copy.offers.items.map((offer, index) => (
                <Reveal key={offer.name} delay={(index % 3) * 70} className={offer.featured ? "offer-grid__featured" : ""}>
                  <article className={`offer-card${offer.featured ? " offer-card--featured" : ""}`}>
                    {offer.featured && <span className="offer-card__flag">{locale === "de" ? "Beste Begleitung" : "Most guidance"}</span>}
                    <div className="offer-card__topline">
                      <p>{offer.eyebrow}</p>
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{offer.name}</h3>
                    <div className="offer-card__price"><strong>{offer.price}</strong><span>{offer.duration}</span></div>
                    <p className="offer-card__body">{offer.body}</p>
                    <ul>
                      {offer.features.map((feature) => <li key={feature}><IconCheck aria-hidden="true" size={16} stroke={1.8} />{feature}</li>)}
                    </ul>
                    <a href={contactHref} className="offer-card__link">
                      {copy.offers.cta}<IconSend aria-hidden="true" size={17} stroke={1.7} />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="offers__note">{copy.offers.note}</p>
          </div>
        </section>

        <section className="section process" aria-labelledby="process-title">
          <div className="shell process__grid">
            <div className="process__copy">
              <Reveal>
                <p className="eyebrow eyebrow--peach">{copy.process.eyebrow}</p>
                <h2 id="process-title">{copy.process.title}<br /><em>{copy.process.accent}</em></h2>
              </Reveal>
              <div className="process-list">
                {copy.process.items.map((item, index) => (
                  <Reveal key={item.number} delay={index * 80}>
                    <article className="process-step">
                      <span>{item.number}</span>
                      <div><h3>{item.title}</h3><p>{item.body}</p></div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="process__visual">
              <div className="process__image-frame">
                <Image
                  src="/images/solomiia/coaching.jpeg"
                  alt={copy.process.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  className="media-image"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section expectations" aria-labelledby="expectations-title">
          <div className="shell">
            <Reveal>
              <div className="section-heading section-heading--offers">
                <div>
                  <p className="eyebrow">{copy.expectations.eyebrow}</p>
                  <h2 id="expectations-title">{copy.expectations.title}</h2>
                </div>
                <p>{copy.expectations.intro}</p>
              </div>
            </Reveal>
            <div className="expectation-grid">
              {copy.expectations.items.map((item, index) => (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="expectation-card">
                    <span className="icon-disc icon-disc--small"><BrandIcon name={item.icon} size={26} /></span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section testimonials" id={copy.testimonials.id} aria-labelledby="testimonials-title">
          <div className="shell">
            <Reveal>
              <div className="section-heading section-heading--wide testimonials__heading">
                <p className="eyebrow">{copy.testimonials.eyebrow}</p>
                <h2 id="testimonials-title">
                  {copy.testimonials.title}<br />
                  <em>{copy.testimonials.accent}</em>
                </h2>
              </div>
            </Reveal>
            <div className="testimonial-grid">
              {copy.testimonials.items.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 80}>
                  <figure className="testimonial-card">
                    <div className="testimonial-card__body">
                      <span className="testimonial-card__quote-mark" aria-hidden="true">“</span>
                      <blockquote className="testimonial-card__quote">
                        <p>{testimonial.quote}</p>
                      </blockquote>
                      <figcaption className="testimonial-card__attribution">
                        <div className="testimonial-card__media">
                          <Image
                            src={testimonial.image}
                            alt=""
                            fill
                            sizes="64px"
                            className="media-image"
                            style={{ objectPosition: testimonial.imagePosition }}
                          />
                        </div>
                        <div className="testimonial-card__identity">
                          <span className="testimonial-card__person">{testimonial.name}</span>
                          <span className="testimonial-card__context">{testimonial.context}</span>
                        </div>
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq" id="faq" aria-labelledby="faq-title">
          <div className="shell faq__grid">
            <Reveal className="faq__heading">
              <p className="eyebrow">{copy.faq.eyebrow}</p>
              <h2 id="faq-title">{copy.faq.title}</h2>
              <p>{copy.faq.intro}</p>
              <CtaLink href={contactHref} variant="outline" small>{copy.navCta}</CtaLink>
            </Reveal>
            <div className="faq-list">
              {copy.faq.items.map((item, index) => (
                <details key={item.question} className="faq-item" open={index === 0}>
                  <summary><span>{item.question}</span><span aria-hidden="true">+</span></summary>
                  <div><p>{item.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id={copy.contact.id} aria-labelledby="contact-title">
          <div className="shell contact-section__grid">
            <Reveal className="contact-section__intro">
              <p className="eyebrow">{copy.contact.eyebrow}</p>
              <h2 id="contact-title">{copy.contact.title}<br /><em>{copy.contact.accent}</em></h2>
              <p className="contact-section__body">{copy.contact.body}</p>
              <p className="contact-section__direct">
                <span>{copy.contact.directContact}</span>
                <a href={`mailto:${siteConfig.email}`}><IconMail aria-hidden="true" size={18} />{siteConfig.email}</a>
              </p>
            </Reveal>
            <Reveal className="contact-section__form" delay={80}>
              <ContactForm copy={copy} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <div className="site-footer__top">
            <BrandLogo inverse />
            <div className="site-footer__claim">
              <p>{copy.footer.closingLine}</p>
            </div>
            <div className="site-footer__disciplines">
              {copy.footer.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
            </div>
          </div>
          <div className="site-footer__middle">
            <div className="site-footer__contact">
              <a href={siteConfig.instagramProfileUrl} target="_blank" rel="noreferrer"><InstagramIcon />{siteConfig.instagramHandle}</a>
              <a href={`mailto:${siteConfig.email}`}><IconMail aria-hidden="true" size={18} />{siteConfig.email}</a>
            </div>
            <p>{locale === "de" ? "Personal Training in Wien nach Vereinbarung · Online-Coaching auf Anfrage" : "Personal training in Vienna by arrangement · Online coaching on request"}</p>
          </div>
          <div className="site-footer__bottom">
            <p>© {new Date().getFullYear()} {siteConfig.name}. {copy.footer.copyright}</p>
            <nav aria-label={locale === "de" ? "Rechtliche Hinweise" : "Legal information"}>
              <Link href={legalPaths[locale].notice}>{copy.footer.legalNotice}</Link>
              <Link href={legalPaths[locale].privacy}>{copy.footer.privacy}</Link>
              <ConsentSettingsButton locale={locale}>{copy.footer.consent}</ConsentSettingsButton>
            </nav>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
      />
    </>
  );
}
