import React, { useState } from 'react';

const LanguageSelector = ({ onSelectLanguage, onClearCode, onClearResult }) => {
  const [language, setLanguage] = useState('python');

  const handleChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    onSelectLanguage(selectedLanguage); // Устанавливаем язык
    onClearCode(); // Очищаем ввод кода
    onClearResult(); // Очищаем результат
  };

  return (
    <select value={language} onChange={handleChange}>
      <option value="python">Python</option>
      <option value="go">Go</option>
    </select>
  );
};

export default LanguageSelector;
