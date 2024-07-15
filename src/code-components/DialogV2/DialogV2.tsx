import * as Dialog from "@radix-ui/react-dialog";
import React, { CSSProperties, ReactNode, useRef } from "react";
import styles from "./DialogV2.module.css";

export interface DialogV2Props {
  open?: boolean;
  defaultOpen?: boolean;
  zIndex: number;
  overlayClass: string;
  themeResetClass: string;
  contentStyle: CSSProperties;
  children: ReactNode;
  onOpenChange?(open: boolean): void;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
}

type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export function DialogV2({
  open,
  defaultOpen,
  zIndex,
  overlayClass,
  themeResetClass,
  contentStyle,
  children,
  onOpenChange,
  onPointerDownOutside,
}: DialogV2Props) {
  const triggerRef = useRef<HTMLElement>();

  return (
    <Dialog.Root
      open={open}
      modal
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={[themeResetClass, styles.overlay, overlayClass].join(" ")}
          style={{ zIndex }}
        >
          <Dialog.Content
            style={contentStyle}
            onOpenAutoFocus={() => {
              triggerRef.current =
                document.activeElement instanceof HTMLElement
                  ? (document.activeElement ?? undefined)
                  : undefined;
            }}
            onCloseAutoFocus={(event) => {
              if (
                triggerRef.current &&
                document.documentElement.contains(triggerRef.current)
              ) {
                triggerRef.current.focus();
                triggerRef.current = undefined;
              }
              event.preventDefault();
            }}
            onPointerDownOutside={(event) => {
              preventEventIfScrollbarClick(event);
              onPointerDownOutside?.(event);
            }}
          >
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * Based on https://github.com/tailwindlabs/headlessui/pull/1333/files#diff-d095a5f3fa3ad7f5ff99576cb61e5d75a979a6b7d5557f8a092f5d5c8c0c34deR49
 */
function preventEventIfScrollbarClick(event: PointerDownOutsideEvent) {
  const target = event.target as HTMLElement;
  const viewport = target.ownerDocument.documentElement;

  // Ignore if the target doesn't exist in the DOM anymore
  if (!viewport.contains(target)) return;

  const originalEvent = event.detail.originalEvent;
  const scrollbarWidth = 20;
  if (
    originalEvent.clientX > viewport.clientWidth - scrollbarWidth ||
    originalEvent.clientX < scrollbarWidth ||
    originalEvent.clientY > viewport.clientHeight - scrollbarWidth ||
    originalEvent.clientY < scrollbarWidth
  ) {
    event.preventDefault();
  }
}

export const DialogV2Title = Dialog.Title;
export const DialogV2Description = Dialog.Description;

export const DialogV2Close = React.forwardRef<
  React.ElementRef<typeof Dialog.Close>,
  React.ComponentPropsWithoutRef<typeof Dialog.Close>
>((props, ref) => (
  <Dialog.Close {...props} asChild ref={ref}>
    <div className={props.className}>{props.children ?? "x"}</div>
  </Dialog.Close>
));
DialogV2Close.displayName = "DialogV2Close";
