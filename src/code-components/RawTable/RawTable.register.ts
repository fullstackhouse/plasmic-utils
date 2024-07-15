import { PlasmicComponentLoader } from "@plasmicapp/loader-react";
import { RawTable } from "./Table";
import { RawTbody } from "./Tbody";
import { RawTd } from "./Td";
import { RawTfoot } from "./Tfoot";
import { RawTh } from "./Th";
import { RawThead } from "./Thead";
import { RawTr } from "./Tr";

export function registerRawTable(
  plasmic: PlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  plasmic.registerComponent(RawTable, {
    name: "RawTable",
    importPath: modulePath + "/src/code-components/raw/Table",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawThead, {
    parentComponentName: "RawTable",
    name: "RawThead",
    importPath: modulePath + "/src/code-components/raw/Thead",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTbody, {
    parentComponentName: "RawTable",
    name: "RawTbody",
    importPath: modulePath + "/src/code-components/raw/Tbody",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTfoot, {
    parentComponentName: "RawTable",
    name: "RawTfoot",
    importPath: modulePath + "/src/code-components/raw/Tfoot",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTr, {
    parentComponentName: "RawTable",
    name: "RawTr",
    importPath: modulePath + "/src/code-components/raw/Tr",
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
    importPath: modulePath + "/src/code-components/raw/Th",
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
    importPath: modulePath + "/src/code-components/raw/Td",
    props: {
      rowSpan: { type: "number", defaultValueHint: 1 },
      colSpan: { type: "number", defaultValueHint: 1 },
      style: { type: "object", advanced: true },
      children: "slot",
    },
  });
}
