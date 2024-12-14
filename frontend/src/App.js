import React, { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import CodeEditor from './components/CodeEditor';
import RunButton from './components/RunButton';
import ResultDisplay from './components/ResultDisplay';


const App = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  const handleRun = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.json();
      setResult(data.status === 'success' ? data.output : data.error);
    } catch (error) {
      setResult('Ошибка подключения к серверу.');
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Online Code Editor</h1>
        <LanguageSelector
          onSelectLanguage={setLanguage}
          onClearCode={() => setCode('')}
          onClearResult={() => setResult('')}
        />
      </div>
      <div className="editor-container">
        <CodeEditor language={language} code={code} setCode={setCode} />
      </div>
      <div className="button-container">
        <RunButton onRun={handleRun} />
      </div>
      <ResultDisplay result={result} />
    </div>
  );
};

export default App;
