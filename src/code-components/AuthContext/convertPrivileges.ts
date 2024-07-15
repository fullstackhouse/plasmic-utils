import { SubModule } from "./SubModule";

export function convertPrivileges(
  privilegesJson: string | undefined,
): Record<string, string[]> {
  if (!privilegesJson) return {};

  const privilegesWithIds = JSON.parse(privilegesJson) as Record<
    string,
    string[]
  >;
  const privilegesWithNames: Record<string, string[]> = {};

  for (const [subModuleId, actions] of Object.entries(privilegesWithIds)) {
    const subModuleIdNumber = Number(subModuleId);
    const subModuleName = SubModule[subModuleIdNumber] || subModuleId;
    privilegesWithNames[subModuleName] = actions;
  }

  return privilegesWithNames;
}
