import ReactQuill from "react-quill-new";

export const componentHelpers = {
  states: {
    value: {
      onChangeArgsToValue: ((content, _delta, _source, _editor) => {
        return content;
      }) as ReactQuill.ReactQuillProps["onChange"],
    },
  },
};
