import type { PlasmicLoader } from "./plasmic";
import { registerApiMutationProvider } from "./code-components/ApiProvider/ApiMutationProvider.register";
import { registerApiProvider } from "./code-components/ApiProvider/ApiProvider.register";
import { registerAuthContext } from "./code-components/AuthContext/AuthContext.register";
import { registerCombobox } from "./code-components/Combobox/Combobox.register";
import { registerDebounceProvider } from "./code-components/DebounceProvider/DebounceProvider.register";
import { registerDialogV2 } from "./code-components/DialogV2/DialogV2.register";
import { registerFollowingTooltip } from "./code-components/FollowingTooltip/FollowingTooltip.register";
import { registerFormProvider } from "./code-components/form/FormProvider.register";
import { registerSwitch } from "./code-components/form/Switch/Switch.register";
import { registerHiddenIfEmptyContainer } from "./code-components/HiddenIfEmptyContainer/HiddenIfEmptyContainer.register";
import { registerOnBeforeUnloadProvider } from "./code-components/OnBeforeUnloadProvider/OnBeforeUnloadProvider.register";
import { registerOnBeforeUnmountProvider } from "./code-components/OnBeforeUnmountProvider/OnBeforeUnmountProvider.register";
import { registerOnChangeProvider } from "./code-components/OnChangeProvider/OnChangeProvider.register";
import { registerRawCheckboxOrRadio } from "./code-components/RawCheckboxOrRadio/CheckboxOrRadio.register";
import { registerRawChildren } from "./code-components/RawChildren/Children.register";
import { registerRawList } from "./code-components/RawList/RawList.register";
import { registerRawNull } from "./code-components/RawNull/RawNull.register";
import { registerRawTable } from "./code-components/RawTable/RawTable.register";
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
  plasmic: PlasmicLoader,
  {
    modulePath = "@myevaluations/myevals-plasmic-utils/dist",
    auth = true,
    router = true,
  }: {
    modulePath?: string;
    /**
     * @default true
     */
    auth?: boolean;
    /**
     * @default true
     */
    router?: boolean;
  } = {},
) {
  registerApiMutationProvider(plasmic, modulePath);
  registerApiProvider(plasmic, modulePath);
  if (auth) registerAuthContext(plasmic, modulePath);
  registerCombobox(plasmic, modulePath);
  registerDayjs(plasmic, modulePath);
  registerDebounceProvider(plasmic, modulePath);
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
  registerRouteQuerySynchronizer(plasmic, modulePath);
  if (router) registerRouter(plasmic, modulePath);
  registerStateProvider(plasmic, modulePath);
  registerSwitch(plasmic, modulePath);
  registerTextLinkOrButton(plasmic, modulePath);
  registerTimeoutProvider(plasmic, modulePath);
  registerWaitFor(plasmic, modulePath);
  registerWindowEventListener(plasmic, modulePath);
  registerZod(plasmic, modulePath);
}
