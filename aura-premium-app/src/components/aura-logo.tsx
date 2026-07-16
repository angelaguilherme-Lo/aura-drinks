export function AuraLogo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative h-10 w-10 rounded-full"
        style={{
          border: `1.4px solid ${light ? "rgba(255,255,255,0.55)" : "rgba(33,28,24,0.25)"}`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            borderTop: `2px solid ${light ? "rgba(255,226,186,0.9)" : "rgba(183,142,79,0.9)"}`,
            borderLeft: "2px solid transparent",
            borderRight: "2px solid transparent",
            borderBottom: "2px solid transparent",
          }}
        />
      </div>

      <div className={light ? "text-white" : ""}>
        <div className="display-font text-3xl leading-none tracking-[0.18em]">AURA</div>
        <div className="text-[10px] uppercase tracking-[0.32em] opacity-80">
          Premium Electrolyte Soda
        </div>
      </div>
    </div>
  );
}