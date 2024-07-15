import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";
import { registerApiMutationProvider } from "./code-components/ApiProvider/ApiMutationProvider.register";
import { registerApiProvider } from "./code-components/ApiProvider/ApiProvider.register";
import { registerAuthContext } from "./code-components/AuthContext/AuthContext.register";
import { registerOnBeforeLogoutProvider } from "./code-components/AuthContext/LogoutProvider/OnBeforeLogoutProvider.register";
import { registerCombobox } from "./code-components/Combobox/Combobox.register";
import { registerDebounceProvider } from "./code-components/DebounceProvider/DebounceProvider.register";
import { registerDialogV2 } from "./code-components/DialogV2/DialogV2.register";
import { registerFollowingTooltip } from "./code-components/FollowingTooltip/FollowingTooltip.register";
import { registerFormProviders } from "./code-components/form/register";
import { registerSwitch } from "./code-components/form/Switch/Switch.register";
import { registerHiddenIfEmptyContainer } from "./code-components/HiddenIfEmptyContainer/HiddenIfEmptyContainer.register";
import { registerOnBeforeUnloadProvider } from "./code-components/OnBeforeUnloadProvider/OnBeforeUnloadProvider.register";
import { registerOnBeforeUnmountProvider } from "./code-components/OnBeforeUnmountProvider/OnBeforeUnmountProvider.register";
import { registerOnChangeProvider } from "./code-components/OnChangeProvider/OnChangeProvider.register";
import { RawCheckboxOrRadio } from "./code-components/raw/CheckboxOrRadio";
import { registerRawChildren } from "./code-components/raw/Children.register";
import { RawLi } from "./code-components/raw/Li";
import { registerRawNull } from "./code-components/raw/Null.register";
import { RawOl } from "./code-components/raw/Ol";
import { RawTable } from "./code-components/raw/Table";
import { RawTbody } from "./code-components/raw/Tbody";
import { RawTd } from "./code-components/raw/Td";
import { RawTfoot } from "./code-components/raw/Tfoot";
import { RawTh } from "./code-components/raw/Th";
import { RawThead } from "./code-components/raw/Thead";
import { RawTr } from "./code-components/raw/Tr";
import { RawUl } from "./code-components/raw/Ul";
import { registerRouteQuerySynchronizer } from "./code-components/Router/RouteQuerySynchronizer.register";
import { registerRouter } from "./code-components/Router/Router.register";
import { registerStateProvider } from "./code-components/StateProvider/StateProvider.register";
import { registerTextLinkOrButton } from "./code-components/TextLinkOrButton/TextLinkOrButton.register";
import { registerTimeoutProvider } from "./code-components/TimeoutProvider/TimeoutProvider.register";
import { registerWindowEventListener } from "./code-components/WindowEventListener/WindowEventListener.register";
import { registerDayjs } from "./custom-functions/dayjs.register";
import { registerParseDateWithoutTimeZone } from "./custom-functions/parseDateWithoutTimeZone.register";
import { registerWaitFor } from "./custom-functions/waitFor.register";
import { registerZod } from "./custom-functions/zod.register";

export function registerMyEvaluationsPlasmicUtils(
  plasmic: NextJsPlasmicComponentLoader,
  modulePath = "@myevaluations/plasmic-utils",
) {
  registerAuthContext(plasmic, modulePath);
  registerRouter(plasmic, modulePath);
  registerRouteQuerySynchronizer(plasmic, modulePath);

  registerDayjs(plasmic, modulePath);
  registerWaitFor(plasmic, modulePath);
  registerZod(plasmic, modulePath);
  registerParseDateWithoutTimeZone(plasmic, modulePath);

  registerStateProvider(plasmic, modulePath);
  registerApiProvider(plasmic, modulePath);
  registerApiMutationProvider(plasmic, modulePath);
  registerFormProviders(plasmic, modulePath);
  registerOnChangeProvider(plasmic, modulePath);
  registerOnBeforeLogoutProvider(plasmic, modulePath);
  registerOnBeforeUnloadProvider(plasmic, modulePath);
  registerOnBeforeUnmountProvider(plasmic, modulePath);
  registerWindowEventListener(plasmic, modulePath);
  registerTimeoutProvider(plasmic, modulePath);
  registerTextLinkOrButton(plasmic, modulePath);
  registerDialogV2(plasmic, modulePath);
  registerDebounceProvider(plasmic, modulePath);
  registerHiddenIfEmptyContainer(plasmic, modulePath);
  registerRawChildren(plasmic, modulePath);
  registerRawNull(plasmic, modulePath);
  registerCombobox(plasmic, modulePath);
  registerSwitch(plasmic, modulePath);
  registerFollowingTooltip(plasmic, modulePath);

  plasmic.registerComponent(RawCheckboxOrRadio, {
    name: "RawCheckboxOrRadio",
    importPath: modulePath + "/src/code-components/raw/CheckboxOrRadio",
    props: {
      type: {
        type: "choice",
        options: ["checkbox", "radio"],
        defaultValue: "checkbox",
      },
      name: "string",
      value: "string",
      checked: "boolean",
      disabled: "boolean",
      onChange: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
      onFocus: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
      onBlur: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
      },
      "aria-label": { type: "string", advanced: true },
      "aria-labelledby": { type: "string", advanced: true },
      children: "slot",
    },
  });

  plasmic.registerComponent(RawLi, {
    name: "RawLi",
    importPath: modulePath + "/src/code-components/raw/Li",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawOl, {
    name: "RawOl",
    importPath: modulePath + "/src/code-components/raw/Ol",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawUl, {
    name: "RawUl",
    importPath: modulePath + "/src/code-components/raw/Ul",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

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
