import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { registerPlasmicUtils } from "./src/register";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "p5fDqKf3tE9hZs34jWhG2h",
      token:
        "Ar2TdOWug7kFV9z7z6xyqCwmL3nMvffDw9UkDeF0EilB4SsqPIGMC1neusBMM4wh7AFknoEYqlps2pjRNw",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: false,
});

registerPlasmicUtils(PLASMIC, { modulePath: "./src" });
