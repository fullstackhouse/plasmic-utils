import type { PlasmicLoader } from "../../plasmic";
import { MemoDataProvider } from "./MemoDataProvider";

export function registerMemoDataProvider(
  plasmic: PlasmicLoader,
  modulePath = "@myevaluations/myevals-plasmic-utils/dist",
) {
  plasmic.registerComponent(MemoDataProvider, {
    name: "MemoDataProvider",
    description:
      "Makes data available to the subtree in a context without the need of rerendering the subtree if the data stays constant.",
    importPath:
      modulePath + "/code-components/MemoDataProvider/MemoDataProvider",
    props: {
      name: {
        type: "string",
        defaultValue: "celebrities",
        description: "The name of the variable to store the data in",
      },
      data: {
        type: "object",
        defaultValue: [
          {
            name: "Fill Murray",
            birthYear: 1950,
            profilePicture: ["https://www.fillmurray.com/200/300"],
          },
          {
            name: "Place Cage",
            birthYear: 1950,
            profilePicture: ["https://www.placecage.com/200/300"],
          },
        ],
      },
      memoKey: {
        type: "string",
        description: "Context data will be updated only when this key changes",
        defaultValueHint: "JSON.stringify(data)",
        helpText: "Can be a string or an array.",
      },
      children: {
        type: "slot",
      },
    },
    providesData: true,
    styleSections: false,
  });
}
