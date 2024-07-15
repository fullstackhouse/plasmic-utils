export interface Subject<TEvent> {
  emit(event: TEvent): void;
  subscribe(listener: SubjectListener<TEvent>): Subscription;
}

export type SubjectListener<TEvent> = (event: TEvent) => void;

export interface Subscription {
  unsubscribe(): void;
}

export function buildSubject<TEvent>(): Subject<TEvent> {
  let listeners: SubjectListener<TEvent>[] = [];

  function emit(event: TEvent) {
    listeners.forEach((listener) => {
      listener(event);
    });
  }

  function subscribe(listener: SubjectListener<TEvent>) {
    listeners.push(listener);

    return {
      unsubscribe() {
        listeners = listeners.filter((l) => l !== listener);
      },
    };
  }

  return { emit, subscribe };
}
