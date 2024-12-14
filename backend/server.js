const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose
  .connect('mongodb+srv://12345kolt:LakzDpIV8TuxkIvz@cluster0.t0v74.mongodb.net/code-executor?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Схема и модель MongoDB
const ExecutionSchema = new mongoose.Schema({
  language: String,
  code: String,
  output: String,
  error: String,
  createdAt: { type: Date, default: Date.now },
});

const Execution = mongoose.model('Execution', ExecutionSchema);

// Маршрут для выполнения кода
app.post('/api/execute', async (req, res) => {
  const { language, code } = req.body;

  if (!code) {
    return res.status(400).json({ status: 'error', error: 'Код отсутствует.' });
  }

  if (!['python', 'go'].includes(language)) {
    return res.status(400).json({ status: 'error', error: 'Язык не поддерживается.' });
  }

  // Выполнение Python-кода
  if (language === 'python') {
    exec(`python3 -c "${code.replace(/"/g, '\\"')}"`, async (err, stdout, stderr) => {
      if (err || stderr) {
        await Execution.create({ language, code, output: null, error: stderr || err.message });
        return res.status(500).json({ status: 'error', error: stderr || err.message });
      }
      await Execution.create({ language, code, output: stdout, error: null });
      res.json({ status: 'success', output: stdout });
    });
  }

  // Выполнение Go-кода
  if (language === 'go') {
    const tempFilePath = path.join(__dirname, 'temp.go');

    // Записываем код в временный файл
    fs.writeFileSync(tempFilePath, code);

    // Выполняем код Go
    exec(`go run ${tempFilePath}`, async (err, stdout, stderr) => {
      if (err || stderr) {
        fs.unlinkSync(tempFilePath); // Удаляем временный файл
        await Execution.create({ language, code, output: null, error: stderr || err.message });
        return res.status(500).json({ status: 'error', error: stderr || err.message });
      }

      fs.unlinkSync(tempFilePath); // Удаляем временный файл
      await Execution.create({ language, code, output: stdout, error: null });
      res.json({ status: 'success', output: stdout });
    });
  }
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
