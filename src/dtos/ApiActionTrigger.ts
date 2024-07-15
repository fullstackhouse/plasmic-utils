/**
 * Action trigger used in button or action definitions.
 *
 * Describes what should happen when an action is initiated.
 * (E.g. a button is clicked.)
 *
 * @example [
 *  { type: "confirm", message: "Are you sure you want to do this?" },
 *  { type: 'open-modal', url: '/Evaluation.aspx', width: 1000, height: 500 }
 * ]
 */
export type ActionTrigger = SingleActionTrigger | SingleActionTrigger[];

export type SingleActionTrigger =
  | OpenUrlActionTrigger
  | RequestApiActionTrigger
  | OpenModalActionTrigger
  | DownloadFileActionTrigger
  | ConfirmActionTrigger;

export interface ConfirmActionTrigger {
  type: "confirm";
  /**
   * If not present, default message will be used.
   */
  message?: string;
}

/**
 * @example
 * {
 *   type: "open-url",
 *   url: "/Evaluations/MilestoneCompetencyWorkSheet.aspx"
 * }
 */
export interface OpenUrlActionTrigger {
  type: "open-url";
  url: string;
  target?: "_blank" | string;
}

/**
 * @example
 * {
 *   type: "request-api",
 *   requestContentType: "application/json",
 *   url: "/Onboarding/UpdateAdminReviewStatus.ashx"
 *   method: "POST",
 *   "data": {
 *     "rid": "1",
 *     "cid": "Aqe=",
 *     "iscustom": "AB==",
 *     "uid": "AQS3sa",
 *     "rgaid": "DJBSKjaV=",
 *     "DepartmentID": "1",
 *     "isverified": "AY==",
 *     "DashBoardPrivilege": 1
 *   }
 * }
 */
export interface RequestApiActionTrigger {
  type: "request-api";
  requestContentType?: string;
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
}

/**
 * @example
 * {
 *   type: "open-modal",
 *   url: "/Evaluations/MilestoneSectionHistory.aspx",
 *   target: "caw-print",
 *   body: { did: "27" },
 *   width: 800,
 *   height: 600
 * }
 */
export interface OpenModalActionTrigger {
  type: "open-modal";
  url: string;
  target?: "_blank" | string;
  name?: string;
  /**
   * If present the window will be opened using POST method (by submitting a HTML form into an external window).
   */
  body?: Record<string, string>;
  width?: number;
  height?: number;
}

/**
 * @example
 * {
 *   type: "download-file",
 *   url: "/Evaluations/MilestoneSectionHistory.aspx",
 *   body: { did: "27" },
 * }
 */
export interface DownloadFileActionTrigger {
  type: "download-file";
  url: string;
  body?: Record<string, string>;
}
