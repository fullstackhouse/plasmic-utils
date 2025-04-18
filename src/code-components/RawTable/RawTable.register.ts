import type { PlasmicLoader } from "../../plasmic";
import { RawTable } from "./Table";
import { RawTbody } from "./Tbody";
import { RawTd } from "./Td";
import { RawTfoot } from "./Tfoot";
import { RawTh } from "./Th";
import { RawThead } from "./Thead";
import { RawTr } from "./Tr";

export function registerRawTable(
  plasmic: PlasmicLoader,
  modulePath = "@fullstackhouse/plasmic-utils/dist",
) {
  plasmic.registerComponent(RawTable, {
    name: "RawTable",
    importPath: modulePath + "/code-components/RawTable/Table",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawThead, {
    parentComponentName: "RawTable",
    name: "RawThead",
    importPath: modulePath + "/code-components/RawTable/Thead",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTbody, {
    parentComponentName: "RawTable",
    name: "RawTbody",
    importPath: modulePath + "/code-components/RawTable/Tbody",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTfoot, {
    parentComponentName: "RawTable",
    name: "RawTfoot",
    importPath: modulePath + "/code-components/RawTable/Tfoot",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTr, {
    parentComponentName: "RawTable",
    name: "RawTr",
    importPath: modulePath + "/code-components/RawTable/Tr",
    props: {
      style: { type: "object", advanced: true },
      children: "slot",
      onMouseEnter: {
        type: "eventHandler",
        argTypes: [],
      },
      onMouseLeave: {
        type: "eventHandler",
        argTypes: [],
      },
    },
  });

  plasmic.registerComponent(RawTh, {
    parentComponentName: "RawTable",
    name: "RawTh",
    importPath: modulePath + "/code-components/RawTable/Th",
    props: {
      rowSpan: { type: "number", defaultValueHint: 1 },
      colSpan: { type: "number", defaultValueHint: 1 },
      style: { type: "object", advanced: true },
      children: "slot",
    },
  });

  plasmic.registerComponent(RawTd, {
    parentComponentName: "RawTable",
    name: "RawTd",
    importPath: modulePath + "/code-components/RawTable/Td",
    props: {
      rowSpan: { type: "number", defaultValueHint: 1 },
      colSpan: { type: "number", defaultValueHint: 1 },
      style: { type: "object", advanced: true },
      children: "slot",
    },
  });
}
