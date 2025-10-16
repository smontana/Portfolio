import "./Style.scss";

// Lightweight CSS-only tooltip component
export function SkillTooltip({ Icon, color, label }) {
  return (
    <div
      className="skill-tooltip-wrapper"
      data-tooltip={label}
      tabIndex={0}
      role="img"
      aria-label={label}
    >
      <Icon style={{ color }} />
    </div>
  );
}
