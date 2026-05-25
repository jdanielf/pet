import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { petController } from '../controllers/petController.js';
import { vacinaController } from '../controllers/vacinaController.js';
import { servicoController } from '../controllers/servicoController.js'; // <-- NOVO IMPORT

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Rotas de Páginas
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')));
router.get('/pets-page', (req, res) => res.sendFile(path.join(__dirname, '../views/pets.html')));

// Rotas da API
router.post('/api/pets', petController.criar);
router.get('/api/pets', petController.listar);

router.post('/api/vacinas', vacinaController.adicionar);
router.get('/api/vacinas/:petId', vacinaController.listarPorPet);

// Novas rotas para Banho e Tosa
router.post('/api/servicos', servicoController.adicionar);        // <-- NOVA ROTA
router.get('/api/servicos/:petId', servicoController.listarPorPet); // <-- NOVA ROTA

export default router;