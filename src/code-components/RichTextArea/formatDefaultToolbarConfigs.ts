export type Toolbar = {
  textStyle: string[];
  colors: string[];
  superSubScript: boolean;
  fontFamily: boolean;
  heading: string[];
  fontSizes: string[];
  formatting: string[];
  inputTypes: string[];
};

export type ToolbarConfigs = (string | Record<string, any>)[][];

export function formatDefaultToolbarConfigs(toolbar: Toolbar): ToolbarConfigs {
  const formattedToolbar: ToolbarConfigs = [];

  if (toolbar.textStyle?.length) {
    formattedToolbar.push(
      toolbar.textStyle.map((style) =>
        style === "strikethrough" ? "strike" : style,
      ),
    );
  }

  if (toolbar.colors?.length) {
    formattedToolbar.push([{ color: [] }, { background: [] }]);
  }

  if (toolbar.superSubScript) {
    formattedToolbar.push([{ script: "sub" }, { script: "super" }]);
  }

  if (toolbar.fontFamily) {
    formattedToolbar.push([{ font: [] }]);
  }

  if (toolbar.fontSizes?.length) {
    formattedToolbar.push([{ size: toolbar.fontSizes }]);
  }

  if (toolbar.inputTypes?.length) {
    formattedToolbar.push(toolbar.inputTypes);
  }

  if (toolbar.heading?.length) {
    const headerMapping = new Map<string, number | false>([
      ["Heading 1", 1],
      ["Heading 2", 2],
      ["Heading 3", 3],
      ["Heading 4", 4],
      ["Heading 5", 5],
      ["Heading 6", 6],
      ["Body", false],
    ]);
    const filteredHeaders = toolbar.heading
      .map((h) => headerMapping.get(h))
      .filter((h) => h !== undefined);
    formattedToolbar.push([{ header: filteredHeaders }]);
  }

  if (toolbar.formatting?.length) {
    if (toolbar.formatting.includes("list")) {
      formattedToolbar.push([{ list: "ordered" }, { list: "bullet" }]);
    }
    if (toolbar.formatting.includes("indentation")) {
      formattedToolbar.push([{ indent: "-1" }, { indent: "+1" }]);
    }
    if (toolbar.formatting.includes("text direction")) {
      formattedToolbar.push([{ direction: "rtl" }]);
    }
    if (toolbar.formatting.includes("alignment")) {
      formattedToolbar.push([{ align: [] }]);
    }
    if (toolbar.formatting.includes("clear formatting")) {
      formattedToolbar.push(["clean"]);
    }
  }

  return formattedToolbar;
}
