import {
  Router
} from "express";

const route = Router();

route.post('/create', (req, res) => {
  const user = req.body;

  return res.status(500).json({
    user
  });
})

export default route;
