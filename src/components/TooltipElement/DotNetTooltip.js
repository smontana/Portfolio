import { useState } from "react";
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
  FloatingPortal
} from "@floating-ui/react";
import { DiDotnet } from "react-icons/di";

export function DotNetTooltip() {
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

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <DiDotnet style={{ color: "blue" }} />
      </div>
      <FloatingPortal>
        {isOpen && (
          <div
            className="Tooltip w-max py-1 px-2 bg-[#444] text-white text-[90%] rounded"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            .NET
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
