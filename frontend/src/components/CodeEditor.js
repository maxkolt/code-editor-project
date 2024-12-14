import React from 'react';
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = ({ language, code, setCode }) => {
  return (
    <MonacoEditor
      height="300px"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(newCode) => setCode(newCode)}
    />
  );
};

export default CodeEditor;
