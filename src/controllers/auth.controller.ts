import type { Request, Response } from "express";
import SpotifyService from "../services/spotify.service.js";

export default class AuthController {
  public static login(req: Request, res: Response) {
    const url = SpotifyService.generateAuthUrl();

    res.redirect(url);
  }

  static async callback(req: Request, res: Response) {
    try {
      const code = req.query.code as string;

      const tokenData = await SpotifyService.exchangeCodeForToken(code);

      const profile = await SpotifyService.getUserProfile(
        tokenData.access_token
      );

      res.json({
        tokens: tokenData,
        user: profile,
      });
    } catch (error) {
      res.status(500).json({ error: "Spotify authentication failed" });
    }
  }
}
