import { ToastType } from "./ToastContext";

export interface ToastRendererProps {
  type?: ToastType;
  title: string;
  description?: string;
  onClose?(): void;
}

export type ToastRenderer = (props: ToastRendererProps) => React.ReactNode;

export const DefaultToastRenderer: ToastRenderer = (props) => {
  return (
    <div>
      <h4>{props.type} Toast</h4>
      <h3>{props.title}</h3>
      {props.description && <p>{props.description}</p>}
    </div>
  );
};
