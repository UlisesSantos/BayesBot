require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/apiRoutes.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ruoutes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});