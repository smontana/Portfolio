// Lightweight CSS-only tooltip component
export function SkillTooltip({ Icon, color, label }) {
  return (
    <div className="skill-tooltip-wrapper" data-tooltip={label}>
      <Icon style={{ color }} aria-label={label} />
    </div>
  );
}
