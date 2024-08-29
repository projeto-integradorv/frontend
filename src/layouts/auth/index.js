
// middleware/auth.js
import { NextApiRequest, NextApiResponse } from 'next';

const authMiddleware = (req, res) => {

    localStorage.setItem('userData', JSON.stringify({ cart_id: { id: 1 } }));



  const user = req.cookies.user;

  if (!user) {
    return res.status(401).json({ error: 'Você não está autenticado' });
  }

  // Se o usuário estiver autenticado, permitir acesso à rota
  return Next();
};

export default authMiddleware;