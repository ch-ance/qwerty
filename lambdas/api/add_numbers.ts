import { NowRequest, NowResponse } from "@vercel/node";

export default (req: NowRequest, res: NowResponse) => {
  const result = req.body.x + req.body.y;
  res.json({ result });
};
