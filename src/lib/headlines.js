// Explore headlines, shared by the article page, the Explore index, the author
// page and their JSON-LD so the wording cannot drift between them. "Best" stays
// for search intent; the list on the page is shuffled, not ranked.
export function exploreHeadline(provider, count) {
  return `Best ${count} Code Quality, Security and Code Review Tools for ${provider} in 2026`;
}
