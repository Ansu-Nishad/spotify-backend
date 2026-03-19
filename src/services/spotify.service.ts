import axios from "axios";
import { spotifyConfig } from "../config/spotify.config.js";

export default class SpotifyService {
  public static generateAuthUrl(): string {
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-top-read",
      "user-read-recently-played",
      "playlist-read-private",
    ].join(" ");

    return (
      `https://accounts.spotify.com/authorize?` +
      `client_id=${spotifyConfig.clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(spotifyConfig.redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`
    );
  }

  static async exchangeCodeForToken(code: string) {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: spotifyConfig.redirectUri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              `${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`
            ).toString("base64"),
        },
      }
    );

    return response.data;
  }

  static async getUserProfile(accessToken: string) {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}
