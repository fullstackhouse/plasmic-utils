import { registerApiMutationProvider } from "./code-components/ApiProvider/ApiMutationProvider.register";
import {
  registerApiProvider,
  RegisterApiProviderOptions,
} from "./code-components/ApiProvider/ApiProvider.register";
import { registerCombobox } from "./code-components/Combobox/Combobox.register";
import { registerDebounceProvider } from "./code-components/DebounceProvider/DebounceProvider.register";
import { registerDeferredValue } from "./code-components/DeferredValue/DeferredValue.register";
import { registerDialogV2 } from "./code-components/DialogV2/DialogV2.register";
import { registerDOMEventListener } from "./code-components/DOMEventListener/DOMEventListener.register";
import { registerFollowingTooltip } from "./code-components/FollowingTooltip/FollowingTooltip.register";
import { registerFormProvider } from "./code-components/form/FormProvider.register";
import { registerSwitch } from "./code-components/form/Switch/Switch.register";
import { registerHiddenIfEmptyContainer } from "./code-components/HiddenIfEmptyContainer/HiddenIfEmptyContainer.register";
import { registerInView } from "./code-components/InView/InView.register";
import { registerInViewContextProvider } from "./code-components/InView/InViewContextProvider.register";
import { registerMemoChildren } from "./code-components/MemoChildren/MemoChildren.register";
import { registerMemoDataProvider } from "./code-components/MemoDataProvider/MemoDataProvider.register";
import { registerOnBeforeUnloadProvider } from "./code-components/OnBeforeUnloadProvider/OnBeforeUnloadProvider.register";
import { registerOnBeforeUnmountProvider } from "./code-components/OnBeforeUnmountProvider/OnBeforeUnmountProvider.register";
import { registerOnChangeProvider } from "./code-components/OnChangeProvider/OnChangeProvider.register";
import { registerRawCheckboxOrRadio } from "./code-components/RawCheckboxOrRadio/CheckboxOrRadio.register";
import { registerRawChildren } from "./code-components/RawChildren/Children.register";
import { registerRawList } from "./code-components/RawList/RawList.register";
import { registerRawNull } from "./code-components/RawNull/RawNull.register";
import { registerRawTable } from "./code-components/RawTable/RawTable.register";
import { registerRouteChangeBlocker } from "./code-components/Router/RouteChangeBlocker.register";
import { registerRouteQuerySynchronizer } from "./code-components/Router/RouteQuerySynchronizer.register";
import { registerRouter } from "./code-components/Router/Router.register";
import { registerStateProvider } from "./code-components/StateProvider/StateProvider.register";
import { registerTextLinkOrButton } from "./code-components/TextLinkOrButton/TextLinkOrButton.register";
import { registerTimeoutProvider } from "./code-components/TimeoutProvider/TimeoutProvider.register";
import { registerVirtualScrollList } from "./code-components/VirtualScroll/VirtualScroll.register";
import { registerDayjs } from "./custom-functions/dayjs.register";
import { registerParseDateWithoutTimeZone } from "./custom-functions/parseDateWithoutTimeZone.register";
import { registerWaitFor } from "./custom-functions/waitFor.register";
import { registerZod } from "./custom-functions/zod.register";
import type { PlasmicLoader } from "./plasmic";
import { registerToastContextProvider } from "./ToastContextProvider/ToastContextProvider.register";

export function registerPlasmicUtils(
  plasmic: PlasmicLoader,
  {
    modulePath = "@fullstackhouse/plasmic-utils/dist",
    router = true,
    toast = true,
    api,
  }: {
    modulePath?: string;
    /**
     * @default true
     */
    router?: boolean;
    /**
     * @default true
     */
    toast?: boolean;
    api?: RegisterApiProviderOptions;
  } = {},
) {
  registerApiMutationProvider(plasmic, modulePath, api);
  registerApiProvider(plasmic, modulePath, api);
  registerCombobox(plasmic, modulePath);
  registerDayjs(plasmic, modulePath);
  registerDebounceProvider(plasmic, modulePath);
  registerDeferredValue(plasmic, modulePath);
  registerDialogV2(plasmic, modulePath);
  registerFollowingTooltip(plasmic, modulePath);
  registerFormProvider(plasmic, modulePath);
  registerHiddenIfEmptyContainer(plasmic, modulePath);
  registerOnBeforeUnloadProvider(plasmic, modulePath);
  registerOnBeforeUnmountProvider(plasmic, modulePath);
  registerOnChangeProvider(plasmic, modulePath);
  registerParseDateWithoutTimeZone(plasmic, modulePath);
  registerRawCheckboxOrRadio(plasmic, modulePath);
  registerRawChildren(plasmic, modulePath);
  registerRawList(plasmic, modulePath);
  registerRawNull(plasmic, modulePath);
  registerRawTable(plasmic, modulePath);
  if (router) {
    registerRouter(plasmic, modulePath);
    registerRouteChangeBlocker(plasmic, modulePath);
    registerRouteQuerySynchronizer(plasmic, modulePath);
  }
  if (toast) registerToastContextProvider(plasmic, modulePath);
  registerMemoChildren(plasmic, modulePath);
  registerMemoDataProvider(plasmic, modulePath);
  registerInView(plasmic, modulePath);
  registerInViewContextProvider(plasmic, modulePath);
  registerStateProvider(plasmic, modulePath);
  registerSwitch(plasmic, modulePath);
  registerTextLinkOrButton(plasmic, modulePath);
  registerTimeoutProvider(plasmic, modulePath);
  registerWaitFor(plasmic, modulePath);
  registerDOMEventListener(plasmic, modulePath);
  registerZod(plasmic, modulePath);
  registerVirtualScrollList(plasmic, modulePath);
}
