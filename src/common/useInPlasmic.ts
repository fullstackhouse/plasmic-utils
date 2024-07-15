import { usePlasmicCanvasContext } from "@plasmicapp/loader-nextjs";

export function useInPlasmic(): boolean {
  const inPlasmicCanvas = !!usePlasmicCanvasContext();
  const inPlasmicPreview =
    typeof window !== "undefined" &&
    window.location.href.includes("/plasmic-host/");
  return inPlasmicCanvas || inPlasmicPreview;
}
