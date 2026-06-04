import { useState } from "react";
import { useApiMode, apiCall } from "@/lib/api";

/**
 * API Playground — only available in development.
 * Lets you call any Xavvi API endpoint and see the raw response.
 * Useful for debugging, testing, and verifying that products appear after
 * the user adds them in the Xavvi creator dashboard.
 */
const ENDPOINTS = [
  { value: "/v1/store/info", label: "GET store/info (read store metadata)" },
  { value: "/v1/product/list", label: "POST product/list (paginated products)" },
  { value: "/v1/category/list", label: "POST category/list (store categories)" },
  { value: "/v1/home", label: "POST home (homepage data — banner, blocks, etc.)" },
  { value: "/v1/cart/list", label: "POST cart/list (current user's cart)" },
];

interface ResponseShape {
  status: number;
  ok: boolean;
  body: string;
  timeMs: number;
  parsed?: unknown;
}

export default function ApiPlaygroundPage() {
  const mode = useApiMode();
  const [endpoint, setEndpoint] = useState("/v1/product/list");
  const [body, setBody] = useState('{\n  "page": 1,\n  "limit": 20\n}');
  const [response, setResponse] = useState<ResponseShape | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    const t0 = performance.now();
    try {
      // Always hit the real Xavvi API, regardless of dispatch mode
      const result = await apiCall(endpoint, JSON.parse(body));
      const t1 = performance.now();
      setResponse({
        status: 200,
        ok: true,
        body: JSON.stringify(result, null, 2),
        parsed: result,
        timeMs: Math.round(t1 - t0),
      });
    } catch (e: unknown) {
      const t1 = performance.now();
      const err = e as { status?: number; message?: string; body?: unknown };
      setResponse({
        status: err.status ?? 0,
        ok: false,
        body: err.body ? JSON.stringify(err.body, null, 2) : (err.message ?? String(e)),
        timeMs: Math.round(t1 - t0),
      });
    } finally {
      setLoading(false);
    }
  };

  // Quick product count helper
  const productCount = (() => {
    if (!response?.ok) return null;
    const data = response.parsed as
      | { data?: { list?: unknown[]; total?: number } }
      | undefined;
    if (data?.data?.list) {
      return {
        list: data.data.list.length,
        total: data.data.total,
      };
    }
    return null;
  })();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">🔌 API Playground</h1>
        <p className="mt-2 text-sm text-white/60">
          Raw calls to the live Xavvi API. Current mode:{" "}
          <span className="font-mono font-bold text-orange-400">{mode}</span>
        </p>
        <p className="mt-1 text-xs text-white/40">
          This page is for development & debugging. It's only useful when
          VITE_XAVVI_API_STORE_ID is set. Use it to verify that products you
          added in the Xavvi creator dashboard actually show up.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-white/50">
            Endpoint
          </label>
          <select
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="mt-1 w-full rounded border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
          >
            {ENDPOINTS.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>

          <label className="mt-4 block text-xs font-medium uppercase tracking-wider text-white/50">
            Request body (JSON)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="mt-1 w-full rounded border border-white/10 bg-zinc-900 px-3 py-2 font-mono text-xs text-white focus:border-orange-500 focus:outline-none"
          />

          <button
            onClick={run}
            disabled={loading}
            className="mt-4 w-full rounded bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Calling…" : "▶ Send Request"}
          </button>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-white/50">
              Response
            </span>
            {response && (
              <span
                className={`text-xs font-mono ${
                  response.ok ? "text-green-400" : "text-red-400"
                }`}
              >
                {response.status} · {response.timeMs}ms
              </span>
            )}
          </div>
          <pre className="h-[400px] overflow-auto rounded border border-white/10 bg-zinc-950 p-3 font-mono text-xs text-white/80">
            {response ? response.body : "— click 'Send Request' to see output —"}
          </pre>

          {productCount && (
            <div className="mt-3 rounded border border-orange-500/30 bg-orange-500/10 p-3 text-sm text-white">
              <strong className="text-orange-400">{productCount.total}</strong>{" "}
              products in this store (page returned {productCount.list}).
              {productCount.total === 0 && (
                <p className="mt-1 text-xs text-white/60">
                  Store is empty. Add products in the Xavvi creator dashboard,
                  then refresh this page.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded border border-white/5 bg-zinc-900/50 p-4 text-xs text-white/50">
        <p className="font-semibold text-white/70">💡 How to use this</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Go to your Xavvi creator dashboard and add a product</li>
          <li>Come back here, click "Send Request" on <code>/v1/product/list</code></li>
          <li>If the total above jumps from 0 → 1+, your product is in the API</li>
          <li>Then visit <a href="/shop" className="text-orange-400 underline">/shop</a> — it should appear</li>
        </ol>
      </div>
    </div>
  );
}
