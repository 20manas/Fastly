import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => res.json(req.user));

export default router;
