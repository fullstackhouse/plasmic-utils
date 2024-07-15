const redirectMinDelay = 15 * 1000; // 15 s
let lastRedirectAt: Date | null = null;

export enum AuthLoginType {
  Redirect,
  Modal,
}

/**
 * Open a login page, in the current window or in a new one.
 */
export function triggerAuthLogin(type: AuthLoginType): void {
  if (
    lastRedirectAt &&
    new Date().getTime() - lastRedirectAt.getTime() < redirectMinDelay
  ) {
    return;
  }
  lastRedirectAt = new Date();

  if (
    type === AuthLoginType.Modal &&
    (location.hostname === "localhost" ||
      location.hostname === "myevals.fullstack.house")
  ) {
    alert(
      "API returned 401! Opening a login page in a modal window so you can sign in.",
    );
    window.open("/", "myevals-login");
    return;
  }

  // TODO what about onbeforeunload confirmation?
  location.reload();
  console.error("API returned 401. Reloading the page...");
}
