// Who publishes Review Radar. One source for the visible disclosure (footer,
// About page, Codacy's tool page), /llms.txt and every schema.org `publisher`,
// so the ownership statement reads the same everywhere. The author of every
// article stays the person in author.js; Codacy is the publisher, not the author.
export const PUBLISHER = {
  name: "Codacy",
  url: "https://www.codacy.com/",
  // Codacy's own description of what it does, used in visible copy and llms.txt.
  about: "Codacy builds code quality, AI code review and code security tools",
  logo: "/logos/codacy.svg",
  sameAs: ["https://github.com/codacy"],
};

/** The publisher as a schema.org Organization, with a stable @id so every page points at the same entity. */
export function publisherLd(site) {
  return {
    "@type": "Organization",
    "@id": `${PUBLISHER.url}#organization`,
    name: PUBLISHER.name,
    url: PUBLISHER.url,
    logo: new URL(PUBLISHER.logo, site).href,
    sameAs: PUBLISHER.sameAs,
  };
}

/** The author as a schema.org Person, linked to the author page and to the publisher she works for. */
export function authorLd(author, site) {
  return {
    "@type": "Person",
    name: author.name,
    url: new URL(`/author/${author.slug}/`, site).href,
    sameAs: [author.linkedin],
    worksFor: { "@id": `${PUBLISHER.url}#organization`, name: PUBLISHER.name },
  };
}
