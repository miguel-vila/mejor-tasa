# Progress

> **Status: PARTIALLY FUNCTIONAL** - Bancolombia parser implemented and tested. 5 PDF parsers remaining.

## What's Done

### Project Structure

- [x] pnpm monorepo with workspaces
- [x] TypeScript configuration
- [x] ESLint + Prettier + Husky pre-commit hooks

### `packages/core`

- [x] Type definitions matching the spec (Offer, Rankings, Rate, etc.)
- [x] Zod schemas for validation
- [x] Enums for BankId, Segment, Channel, ProductType, etc.

### `packages/updater`

- [x] Project setup with vitest
- [x] Utility functions (number parsing, fetch with retry, hashing)
- [x] Rankings computation logic
- [x] Parser stubs for all 6 banks:
  - Bancolombia (HTML)
  - BBVA (PDF)
  - Scotiabank Colpatria (PDF)
  - Banco Caja Social (PDF)
  - AV Villas (PDF)
  - Itaú (PDF)

### `apps/web`

- [x] Next.js 15 with App Router
- [x] Tailwind CSS styling
- [x] Home page with "best rates" cards
- [x] Rates table page with filters (bank, type, currency, segment)
- [x] Methodology page
- [x] Fake data for testing UI

### Infrastructure

- [x] Fixture directories for each bank
- [x] Sample JSON data files for frontend testing

## What's NOT Done

### Parsers (Critical)

- [x] **Bancolombia**: Implement HTML parsing with cheerio selectors
- [ ] **BBVA**: Implement PDF text extraction with pdfjs-dist
- [ ] **Scotiabank**: Implement PDF parsing
- [ ] **Caja Social**: Implement PDF parsing
- [ ] **AV Villas**: Implement PDF link discovery + parsing
- [ ] **Itaú**: Implement PDF parsing

### Testing

- [x] Download HTML/PDF fixtures for each bank (Bancolombia done)
- [x] Write unit tests for parsers (Bancolombia: 14 tests)
- [ ] Snapshot tests for extracted offers

### Deployment

- [ ] Railway configuration
- [ ] GitHub Actions for scheduled ETL runs
- [ ] Data storage setup (where to host JSON files)

### Frontend Polish

- [ ] Mobile navigation menu
- [ ] Offer detail page
- [ ] Loading states refinement
- [ ] Error boundaries

## Next Steps

1. ~~Download sample HTML/PDFs to `fixtures/` for each bank~~ ✓ (Bancolombia done)
2. ~~Implement Bancolombia parser first (simplest - HTML)~~ ✓
3. Implement one PDF parser as a template (recommend BBVA or Scotiabank)
4. ~~Add tests with fixtures~~ ✓ (Bancolombia: 14 passing tests)
5. Deploy to Railway

## Running the Project

```bash
pnpm install
pnpm --filter @mejor-tasa/core build
pnpm dev
```

The frontend will show fake data. Real data requires implementing the parsers.
