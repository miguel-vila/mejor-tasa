import { fetchOffers } from "@/lib/data";

export async function StatsSection() {
  const { offers, generated_at } = await fetchOffers();

  const uniqueBanks = new Set(offers.map((o) => o.bank_id));
  const bankCount = uniqueBanks.size;
  const offerCount = offers.length;

  return (
    <div className="flex flex-wrap gap-6 md:gap-12">
      <StatCard value={bankCount} label="Bancos consultados" highlight />
      <StatCard value={offerCount} label="Ofertas analizadas" />
    </div>
  );
}

function StatCard({
  value,
  label,
  highlight = false,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`px-6 py-4 rounded-xl ${
        highlight
          ? "bg-accent-600 text-white shadow-lg"
          : "bg-white border border-gray-200 text-gray-900"
      }`}
    >
      <p className={`text-4xl font-bold ${highlight ? "text-white" : "text-accent-600"}`}>
        {value}
      </p>
      <p className={`text-sm font-medium ${highlight ? "text-accent-100" : "text-gray-500"}`}>
        {label}
      </p>
    </div>
  );
}
