import type {
  BankId,
  ProductType,
  CurrencyIndex,
  Segment,
  Channel,
  SourceType,
  ExtractionMethod,
  ScenarioKey,
} from "./enums.js";

// Rate representations
export type CopFixedRate = {
  kind: "COP_FIXED";
  ea_percent_from: number; // e.g. 12.0 (E.A. percentage)
  ea_percent_to?: number;
  mv_percent_from?: number; // optional M.V. if provided
  mv_percent_to?: number;
};

export type UvrSpreadRate = {
  kind: "UVR_SPREAD";
  spread_ea_from: number; // e.g. 6.50 means "UVR + 6.50%"
  spread_ea_to?: number;
  spread_mv_from?: number;
  spread_mv_to?: number;
};

export type Rate = CopFixedRate | UvrSpreadRate;

// Payroll discount condition
export type PayrollDiscount = {
  type: "BPS_OFF" | "PERCENT_OFF";
  value: number; // e.g. 100 (bps) or 1.0 (%)
  applies_to: "RATE";
  note?: string;
};

// Offer conditions
export type OfferConditions = {
  payroll_discount?: PayrollDiscount;
  notes?: string[];
};

// Source extraction info
export type ExtractionInfo = {
  method: ExtractionMethod;
  locator: string; // CSS selector or regex identifier
  excerpt?: string; // short snippet for debugging
};

// Source provenance
export type OfferSource = {
  url: string;
  source_type: SourceType;
  document_label?: string; // e.g. "Tasas y productos de crédito"
  valid_from?: string; // ISO date if present (YYYY-MM-DD)
  retrieved_at: string; // ISO timestamp
  extracted_text_fingerprint?: string; // hash for diffing
  extraction: ExtractionInfo;
};

// Main Offer type
export type Offer = {
  id: string; // stable hash from key fields + source
  bank_id: BankId;
  bank_name: string;

  product_type: ProductType;
  currency_index: CurrencyIndex;
  segment: Segment;
  channel: Channel;

  rate: Rate;

  // Constraints (optional unless explicitly disclosed)
  term_months_min?: number;
  term_months_max?: number;
  amount_min_cop?: number;
  amount_max_cop?: number;

  conditions: OfferConditions;
  source: OfferSource;
};

// Ranking metric
export type RankingMetric =
  | { kind: "EA_PERCENT"; value: number }
  | { kind: "UVR_SPREAD_EA"; value: number };

// Scenario ranking entry
export type ScenarioRanking = {
  offer_id: string;
  metric: RankingMetric;
};

// Rankings object (precomputed)
export type Rankings = {
  generated_at: string; // ISO timestamp
  scenarios: Partial<Record<ScenarioKey, ScenarioRanking>>;
};

// Dataset wrapper for offers
export type OffersDataset = {
  generated_at: string;
  offers: Offer[];
};

// Parse result from a bank scraper
export type BankParseResult = {
  bank_id: BankId;
  offers: Offer[];
  warnings: string[];
  raw_text_hash: string;
};
