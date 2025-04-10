import { useMemo } from "react";

export interface ToolbarOptions {
  textStyle?: Array<keyof typeof TEXT_STYLE_DICT>;
  fontFamily?: boolean;
  heading?: Array<keyof typeof HEADING_TYPES_DICT>;
  fontSizes?: Array<keyof typeof FONT_SIZES>;
  colors?: Array<keyof typeof COLOR_TYPE_DICT>;
  script?: any;
  formatting?: Array<keyof typeof FORMATTING_TYPES_DICT>;
  inputTypes?: Array<keyof typeof INPUT_TYPES>;
}

export function useToolbar({
  toolbar,
  customToolbar,
}: {
  toolbar?: ToolbarOptions;
  customToolbar?: any[];
}) {
  return useMemo(() => {
    if (customToolbar) {
      return customToolbar;
    }

    const {
      textStyle,
      fontFamily,
      heading,
      fontSizes,
      colors,
      script,
      formatting,
      inputTypes,
    } = toolbar ?? {};

    const textStyleControls = Object.keys(TEXT_STYLE_DICT)
      .filter((key) => textStyle?.includes(key as any))
      .map((key) => TEXT_STYLE_DICT[key as keyof typeof TEXT_STYLE_DICT]);

    const colorControls = Object.keys(COLOR_TYPE_DICT)
      .filter((key) => colors?.includes(key as any))
      .map((key) => ({
        [COLOR_TYPE_DICT[key as keyof typeof COLOR_TYPE_DICT]]: [],
      }));

    const scriptControls = script
      ? [{ script: "super" }, { script: "sub" }]
      : undefined;

    const fontControls = [
      fontFamily ? { font: [] } : undefined,
      heading?.length
        ? {
            header: Object.keys(HEADING_TYPES_DICT)
              .filter((key) => heading.includes(key as any))
              .map(
                (key) =>
                  HEADING_TYPES_DICT[key as keyof typeof HEADING_TYPES_DICT],
              ),
          }
        : undefined,
      fontSizes?.length
        ? { size: FONT_SIZES.filter((fs) => fontSizes.includes(fs as any)) }
        : undefined,
    ].filter((i) => i);

    const listControlsGroup: any[] = [];
    const indentationControlsGroup: any[] = [];
    const otherFormattingControlsGroup: any[] = [];

    formatting?.map((f: keyof typeof FORMATTING_TYPES_DICT) => {
      switch (f) {
        case "list":
          listControlsGroup.push({
            [FORMATTING_TYPES_DICT["list"]]: "ordered",
          });
          listControlsGroup.push({ [FORMATTING_TYPES_DICT["list"]]: "bullet" });
          break;
        case "alignment":
          otherFormattingControlsGroup.push({
            [FORMATTING_TYPES_DICT["alignment"]]: [],
          });
          break;
        case "indentation":
          indentationControlsGroup.push({
            [FORMATTING_TYPES_DICT["indentation"]]: "-1",
          });
          indentationControlsGroup.push({
            [FORMATTING_TYPES_DICT["indentation"]]: "+1",
          });
          break;
        case "text direction":
          otherFormattingControlsGroup.push({
            [FORMATTING_TYPES_DICT["text direction"]]: "rtl",
          });
          break;
        case "clear formatting":
          otherFormattingControlsGroup.push(
            FORMATTING_TYPES_DICT["clear formatting"],
          );
          break;
      }
    });

    const otherInputControls = inputTypes?.length
      ? INPUT_TYPES.filter((inp) => inputTypes.includes(inp as any))
      : undefined;

    return [
      textStyleControls,
      colorControls,
      scriptControls,
      fontControls,
      listControlsGroup,
      indentationControlsGroup,
      otherFormattingControlsGroup,
      otherInputControls,
    ].filter((i) => i?.length);
  }, [toolbar, customToolbar]);
}

export type ToolbarOptionsType =
  | "textStyle"
  | "script"
  | "fontFamily"
  | "heading"
  | "fontSizes"
  | "colors"
  | "formatting"
  | "inputTypes";

export const TEXT_STYLE_DICT = {
  bold: "bold",
  italic: "italic",
  underline: "underline",
  strikethrough: "strike",
};

export const HEADING_TYPES_DICT = {
  "Heading 1": 1,
  "Heading 2": 2,
  "Heading 3": 3,
  "Heading 4": 4,
  "Heading 5": 5,
  "Heading 6": 6,
  Body: "normal",
};

export const FONT_SIZES = ["small", "medium", "large", "huge"];

export const COLOR_TYPE_DICT = {
  "text color": "color",
  "text background": "background",
};

export const FORMATTING_TYPES_DICT = {
  alignment: "align",
  list: "list",
  indentation: "indent",
  "text direction": "direction",
  "clear formatting": "clean",
};

export const INPUT_TYPES = [
  "link",
  "blockquote",
  "image",
  "video",
  "code-block",
  "formula",
];
