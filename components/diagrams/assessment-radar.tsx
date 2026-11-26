/**
 * Radar chart comparing an illustrative "current" vs "target" technology
 * maturity across six areas. Values are an example shape, not client data.
 */
const CURRENT = [0.45, 0.6, 0.35, 0.55, 0.4, 0.5];
const TARGET = [0.88, 0.86, 0.82, 0.9, 0.88, 0.84];

export function AssessmentRadar({
  axes,
  label,
}: {
  axes: string[];
  label: string;
}) {
  const cx = 280;
  const cy = 222;
  const R = 165;
  const angle = (i: number) => ((-90 + (360 / axes.length) * i) * Math.PI) / 180;
  const pt = (i: number, r: number) => [cx + R * r * Math.cos(angle(i)), cy + R * r * Math.sin(angle(i))] as const;
  const poly = (values: number[]) => values.map((v, i) => pt(i, v).join(",")).join(" ");

  return (
    <figure role="img" aria-label={label} className="relative mx-auto w-full max-w-[600px]">
      <svg viewBox="0 0 560 444" className="h-auto w-full overflow-visible">
        <defs>
          <linearGradient id="radar-target" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#2563EB" stopOpacity="0.35" />
            <stop offset="1" stopColor="#06B6D4" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="radar-bg" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#eff6ff" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={R + 20} fill="url(#radar-bg)" />

        {/* grid */}
        {[0.25, 0.5, 0.75, 1].map((lvl) => (
          <polygon
            key={lvl}
            points={poly(axes.map(() => lvl))}
            fill={lvl === 1 ? "#f8fafc" : "none"}
            stroke="#cbd5e1"
            strokeWidth={lvl === 1 ? 1.2 : 0.8}
            strokeDasharray={lvl === 1 ? undefined : "3 4"}
          />
        ))}
        {axes.map((_, i) => {
          const [x, y] = pt(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#cbd5e1" strokeWidth="0.8" />;
        })}

        {/* target */}
        <polygon points={poly(TARGET)} fill="url(#radar-target)" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
        {TARGET.map((v, i) => {
          const [x, y] = pt(i, v);
          return <circle key={i} cx={x} cy={y} r="6.5" fill="#fff" stroke="#2563EB" strokeWidth="3" />;
        })}

        {/* current */}
        <polygon
          points={poly(CURRENT)}
          fill="#f59e0b"
          fillOpacity="0.22"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeDasharray="6 4"
        />
        {CURRENT.map((v, i) => {
          const [x, y] = pt(i, v);
          return <circle key={i} cx={x} cy={y} r="5.5" fill="#f59e0b" />;
        })}

        {/* labels */}
        {axes.map((name, i) => {
          const [x, y] = pt(i, 1.16);
          const anchor = Math.abs(x - cx) < 4 ? "middle" : x > cx ? "start" : "end";
          return (
            <text
              key={name}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="fill-navy-900"
              style={{ fontSize: 23, fontWeight: 600 }}
            >
              {name}
            </text>
          );
        })}
      </svg>
    </figure>
  );
}
