import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type TimeoutId = ReturnType<typeof setTimeout>;

function initTimer(
  delay: number,
  repeat: boolean,
  leading: boolean,
  onTimeout: () => void,
): DestroyTimer {
  if (repeat) {
    if (leading) onTimeout();

    const interval: TimeoutId | null = setInterval(() => onTimeout(), delay);
    return () => clearInterval(interval);
  }

  const timeout: TimeoutId | null = setTimeout(() => onTimeout(), delay);
  return () => clearTimeout(timeout);
}

type DestroyTimer = () => void;

export interface TimeoutProviderProps {
  delay: number | null | undefined;
  repeat: boolean;
  leading: boolean;
  onTimerStart?(delay: number): void;
  onTimeout?(): void;
}

export interface TimeoutProviderActions {
  reset(): void;
}

export const TimeoutProvider = forwardRef<
  TimeoutProviderActions,
  TimeoutProviderProps
>(function TimeoutProvider(
  { delay, repeat, leading, onTimerStart, onTimeout }: TimeoutProviderProps,
  ref,
) {
  const onTimerStartRef = useRef(onTimerStart);
  onTimerStartRef.current = onTimerStart;

  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  const destroyTimeoutRef = useRef<DestroyTimer>();

  function init(
    delay: number | null | undefined,
    repeat: boolean,
    leading: boolean,
  ): DestroyTimer | undefined {
    if (delay == null) return;
    onTimerStartRef.current?.(delay);

    const destroyTimer = initTimer(delay, repeat, leading, () =>
      onTimeoutRef.current?.(),
    );
    destroyTimeoutRef.current = destroyTimer;

    return destroyTimer;
  }

  function deinit(destroyTimer = destroyTimeoutRef.current) {
    if (destroyTimer) {
      destroyTimer();
      destroyTimer = undefined;
    }
  }

  useImperativeHandle(ref, () => {
    return {
      reset() {
        deinit();
        init(delay, repeat, leading);
      },
    };
  });

  useEffect(() => {
    deinit();
    return init(delay, repeat, leading);
  }, [delay, repeat, leading]);

  return null;
});
