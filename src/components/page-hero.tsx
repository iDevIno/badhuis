import Link from "next/link";

export function PageHero({ title, intro }: { title: string; intro: string }) {
  return (
    <section className="page-hero">
      <div className="container page-heading-inner">
        <nav className="page-heading-trail" aria-label="Broodkruimelnavigatie">
          <Link href="/">Home</Link>
          <span className="page-heading-separator" aria-hidden="true" />
          <span aria-current="page">{title}</span>
        </nav>
        <div className="page-heading-row">
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
        </div>
      </div>
    </section>
  );
}
