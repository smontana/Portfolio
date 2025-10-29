import { useState, useMemo } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useClick,
  FloatingPortal
} from "@floating-ui/react";
import "./Style.scss";

export function SkillTooltip({ Icon, color, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start"
      }),
      shift()
    ]
  });

  // Detect if device supports touch (coarse pointer = touch device)
  const isTouchDevice = useMemo(
    () => window.matchMedia("(pointer: coarse)").matches,
    []
  );

  // Event listeners to change the open state
  // On touch: use click interaction only
  // On mouse/keyboard: use hover + focus
  const click = useClick(context, { enabled: isTouchDevice });
  const hover = useHover(context, { move: false, enabled: !isTouchDevice });
  const focus = useFocus(context, { enabled: !isTouchDevice });
  // Prevent dismissing on reference press to avoid the blink bug
  const dismiss = useDismiss(context, { referencePress: false });
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    focus,
    dismiss,
    role
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <Icon style={{ color }} />
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            className="Tooltip"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {label}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
