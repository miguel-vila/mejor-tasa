import { fetchRankings, fetchOffers } from "@/lib/data";
import { formatRate, SCENARIO_LABELS, SCENARIO_DESCRIPTIONS } from "@/lib/format";
import { ScenarioKey, type Offer, type RankedEntry } from "@compara-tasa/core";

export async function BestRatesSection() {
  const [rankings, { offers }] = await Promise.all([fetchRankings(), fetchOffers()]);

  const offerMap = new Map(offers.map((o) => [o.id, o]));

  const scenarios = Object.values(ScenarioKey);

  if (Object.keys(rankings.scenarios).length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No hay datos disponibles en este momento. Por favor, intenta más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scenarios.map((scenarioKey) => {
        const ranking = rankings.scenarios[scenarioKey];
        if (!ranking || ranking.length === 0) return null;

        return (
          <CompactRankingCard
            key={scenarioKey}
            scenarioKey={scenarioKey}
            ranking={ranking}
            offerMap={offerMap}
          />
        );
      })}
    </div>
  );
}

function CompactRankingCard({
  scenarioKey,
  ranking,
  offerMap,
}: {
  scenarioKey: ScenarioKey;
  ranking: RankedEntry[];
  offerMap: Map<string, Offer>;
}) {
  // Determine icon based on scenario
  const getScenarioIcon = (key: ScenarioKey) => {
    if (key.includes("uvr")) return "📈";
    if (key.includes("cop")) return "💵";
    if (key.includes("payroll")) return "💼";
    if (key.includes("digital")) return "📱";
    return "🏦";
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-700">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center text-lg">
          {getScenarioIcon(scenarioKey)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-teal-400 font-medium">
            Mejor Tasa
          </p>
          <h3 className="text-white font-semibold truncate">{SCENARIO_LABELS[scenarioKey]}</h3>
        </div>
      </div>

      {/* Ranking List */}
      <div className="p-2 space-y-1.5">
        {ranking.map((entry) => {
          const offer = offerMap.get(entry.offer_id);
          if (!offer) return null;

          return (
            <RankingRow
              key={entry.offer_id}
              entry={entry}
              offer={offer}
              isFirst={entry.position === 1}
            />
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-slate-700">
        <p className="text-[11px] text-slate-500">{SCENARIO_DESCRIPTIONS[scenarioKey]}</p>
      </div>
    </div>
  );
}

function RankingRow({
  entry,
  offer,
  isFirst,
}: {
  entry: RankedEntry;
  offer: Offer;
  isFirst: boolean;
}) {
  const positionStyles: Record<number, { bg: string; text: string }> = {
    1: { bg: "bg-gradient-to-r from-amber-500 to-yellow-500", text: "text-slate-900" },
    2: { bg: "bg-gradient-to-r from-slate-400 to-slate-300", text: "text-slate-900" },
    3: { bg: "bg-gradient-to-r from-amber-700 to-amber-600", text: "text-white" },
  };

  const style = positionStyles[entry.position] || positionStyles[3];

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
        isFirst
          ? "bg-gradient-to-r from-slate-800 to-amber-500/10 border border-amber-500/30"
          : "bg-slate-800/50 hover:bg-slate-700/50"
      }`}
    >
      {/* Position Badge */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm ${style.bg} ${style.text}`}
      >
        {entry.position}
      </div>

      {/* Bank Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm truncate">{offer.bank_name}</p>
        <p className="text-slate-400 text-xs truncate">
          {offer.segment !== "UNKNOWN" && (offer.segment === "VIS" ? "VIS" : "No VIS")}
          {offer.channel === "DIGITAL" && " • Digital"}
          {offer.conditions.payroll_discount && " • Con nómina"}
        </p>
      </div>

      {/* Rate */}
      <div className="text-right flex-shrink-0">
        <p className={`font-bold ${isFirst ? "text-teal-300 text-lg" : "text-teal-400 text-base"}`}>
          {formatRate(offer.rate)}
        </p>
      </div>
    </div>
  );
}
