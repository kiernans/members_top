import { Request, Response, NextFunction } from 'express';

function logout(req: Request, res: Response, next: NextFunction) {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
}

export default { logout };
