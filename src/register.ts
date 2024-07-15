import { registerApiMutationProvider } from "@/src/code-components/ApiProvider/ApiMutationProvider.register";
import { registerApiProvider } from "@/src/code-components/ApiProvider/ApiProvider.register";
import { registerAuthContext } from "@/src/code-components/AuthContext/AuthContext.register";
import { registerOnBeforeLogoutProvider } from "@/src/code-components/AuthContext/LogoutProvider/OnBeforeLogoutProvider.register";
import { registerOnBeforeUnloadProvider } from "@/src/code-components/OnBeforeUnloadProvider/OnBeforeUnloadProvider.register";
import { registerOnBeforeUnmountProvider } from "@/src/code-components/OnBeforeUnmountProvider/OnBeforeUnmountProvider.register";
import { registerCombobox } from "@/src/code-components/Combobox/Combobox.register";
import { registerDialogV2 } from "@/src/code-components/DialogV2/DialogV2.register";
import { registerHiddenIfEmptyContainer } from "@/src/code-components/HiddenIfEmptyContainer/HiddenIfEmptyContainer.register";
import { registerOnChangeProvider } from "@/src/code-components/OnChangeProvider/OnChangeProvider.register";
import { registerRouteQuerySynchronizer } from "@/src/code-components/Router/RouteQuerySynchronizer.register";
import { registerRouter } from "@/src/code-components/Router/Router.register";
import { registerStateProvider } from "@/src/code-components/StateProvider/StateProvider.register";
import { registerTextLinkOrButton } from "@/src/code-components/TextLinkOrButton/TextLinkOrButton.register";
import { registerTimeoutProvider } from "@/src/code-components/TimeoutProvider/TimeoutProvider.register";
import { registerSwitch } from "@/src/code-components/form/Switch/Switch.register";
import { registerFormProviders } from "@/src/code-components/form/register";
import { RawCheckboxOrRadio } from "@/src/code-components/raw/CheckboxOrRadio";
import { registerRawChildren } from "@/src/code-components/raw/Children.register";
import { RawLi } from "@/src/code-components/raw/Li";
import { registerRawNull } from "@/src/code-components/raw/Null.register";
import { RawOl } from "@/src/code-components/raw/Ol";
import { RawTable } from "@/src/code-components/raw/Table";
import { RawTbody } from "@/src/code-components/raw/Tbody";
import { RawTd } from "@/src/code-components/raw/Td";
import { RawTfoot } from "@/src/code-components/raw/Tfoot";
import { RawTh } from "@/src/code-components/raw/Th";
import { RawThead } from "@/src/code-components/raw/Thead";
import { RawTr } from "@/src/code-components/raw/Tr";
import { RawUl } from "@/src/code-components/raw/Ul";
import { registerDayjs } from "@/src/custom-functions/dayjs.register";
import { registerParseDateWithoutTimeZone } from "@/src/custom-functions/parseDateWithoutTimeZone.register";
import { registerWaitFor } from "@/src/custom-functions/waitFor.register";
import { registerZod } from "@/src/custom-functions/zod.register";
import { registerFollowingTooltip } from "@/src/code-components/FollowingTooltip/FollowingTooltip.register";
import { registerDebounceProvider } from "@/src/code-components/DebounceProvider/DebounceProvider.register";
import { registerWindowEventListener } from "@/src/code-components/WindowEventListener/WindowEventListener.register";
import { NextJsPlasmicComponentLoader } from "@plasmicapp/loader-nextjs";

export function registerAll(plasmic: NextJsPlasmicComponentLoader) {
  registerAuthContext(plasmic);
  registerRouter(plasmic);
  registerRouteQuerySynchronizer(plasmic);

  registerDayjs(plasmic);
  registerWaitFor(plasmic);
  registerZod(plasmic);
  registerParseDateWithoutTimeZone(plasmic);

  registerStateProvider(plasmic);
  registerApiProvider(plasmic);
  registerApiMutationProvider(plasmic);
  registerFormProviders(plasmic);
  registerOnChangeProvider(plasmic);
  registerOnBeforeLogoutProvider(plasmic);
  registerOnBeforeUnloadProvider(plasmic);
  registerOnBeforeUnmountProvider(plasmic);
  registerWindowEventListener(plasmic);
  registerTimeoutProvider(plasmic);
  registerTextLinkOrButton(plasmic);
  registerDialogV2(plasmic);
  registerDebounceProvider(plasmic);
  registerHiddenIfEmptyContainer(plasmic);
  registerRawChildren(plasmic);
  registerRawNull(plasmic);
  registerCombobox(plasmic);
  registerSwitch(plasmic);
  registerFollowingTooltip(plasmic);

  plasmic.registerComponent(RawCheckboxOrRadio, {
    name: "RawCheckboxOrRadio",
    importPath: "./src/code-components/raw/CheckboxOrRadio",
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
    importPath: "./src/code-components/raw/Li",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawOl, {
    name: "RawOl",
    importPath: "./src/code-components/raw/Ol",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawUl, {
    name: "RawUl",
    importPath: "./src/code-components/raw/Ul",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTable, {
    name: "RawTable",
    importPath: "./src/code-components/raw/Table",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawThead, {
    parentComponentName: "RawTable",
    name: "RawThead",
    importPath: "./src/code-components/raw/Thead",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTbody, {
    parentComponentName: "RawTable",
    name: "RawTbody",
    importPath: "./src/code-components/raw/Tbody",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTfoot, {
    parentComponentName: "RawTable",
    name: "RawTfoot",
    importPath: "./src/code-components/raw/Tfoot",
    props: { style: { type: "object", advanced: true }, children: "slot" },
  });

  plasmic.registerComponent(RawTr, {
    parentComponentName: "RawTable",
    name: "RawTr",
    importPath: "./src/code-components/raw/Tr",
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
    importPath: "./src/code-components/raw/Th",
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
    importPath: "./src/code-components/raw/Td",
    props: {
      rowSpan: { type: "number", defaultValueHint: 1 },
      colSpan: { type: "number", defaultValueHint: 1 },
      style: { type: "object", advanced: true },
      children: "slot",
    },
  });
}
