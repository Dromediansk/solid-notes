"use client";

import type { FC, ForwardedRef } from "react";
import {
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
} from "@mdxeditor/editor";

type InitializedMDXEditorProps = MDXEditorProps & {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
};

const InitializedMDXEditor: FC<InitializedMDXEditorProps> = ({
  editorRef,
  ...props
}) => {
  return (
    <MDXEditor
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
};

export default InitializedMDXEditor;
