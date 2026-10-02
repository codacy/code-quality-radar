// Explore headlines, shared by the article page, the Explore index, the author
// page and their JSON-LD so the wording cannot drift between them. "Best" stays
// for search intent; the list on the page is shuffled, not ranked.
export function exploreHeadline(provider, count) {
  return `Best ${count} Code Quality, Security and Code Review Tools for ${provider} in 2026`;
}

// The <title> leads with the platform: search results cut titles off around 60
// characters, and the headline's platform name starts near character 57, so all
// seven pages would otherwise show the same truncated text. The H1 stays the headline.
export function exploreTitle(provider, count) {
  return `${provider}: Best ${count} Code Quality, Security and Code Review Tools in 2026`;
}
