import Link from "next/link";
export function PageHero({ title, intro }: { title: string; intro: string }) { return <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> <span aria-hidden="true">/</span> {title}</div><h1>{title}</h1><p className="lead">{intro}</p></div></section>; }
