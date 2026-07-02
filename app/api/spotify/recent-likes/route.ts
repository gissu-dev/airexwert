import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type SpotifySavedTrackResponse = {
  items?: Array<{
    added_at: string;
    track?: {
      id: string;
      name: string;
      duration_ms: number;
      external_urls?: {
        spotify?: string;
      };
      artists?: Array<{
        name: string;
      }>;
      album?: {
        name: string;
        images?: Array<{
          url: string;
          width: number | null;
          height: number | null;
        }>;
      };
    };
  }>;
};

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
};

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({
      configured: false,
      preview: process.env.NODE_ENV !== "production",
      tracks:
        process.env.NODE_ENV !== "production" ? createPreviewTracks(20) : []
    });
  }

  try {
    const token = await getSpotifyAccessToken({
      clientId,
      clientSecret,
      refreshToken
    });

    const response = await fetch("https://api.spotify.com/v1/me/tracks?limit=20", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          configured: true,
          preview: false,
          tracks: [],
          error: "Could not load recently liked Spotify tracks."
        },
        { status: response.status }
      );
    }

    const data = (await response.json()) as SpotifySavedTrackResponse;

    return NextResponse.json({
      configured: true,
      preview: false,
      tracks: (data.items ?? [])
        .map((item) => {
          const track = item.track;

          if (!track) {
            return null;
          }

          return {
            id: track.id,
            title: track.name,
            artist: track.artists?.map((artist) => artist.name).join(", ") ?? "",
            album: track.album?.name ?? "",
            albumArt: track.album?.images?.[0]?.url ?? "",
            spotifyUrl: track.external_urls?.spotify ?? "",
            addedAt: item.added_at,
            durationMs: track.duration_ms
          };
        })
        .filter(Boolean)
    });
  } catch {
    return NextResponse.json(
      {
        configured: true,
        preview: false,
        tracks: [],
        error: "Could not load recently liked Spotify tracks."
      },
      { status: 500 }
    );
  }
}

async function getSpotifyAccessToken({
  clientId,
  clientSecret,
  refreshToken
}: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}) {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    }),
    cache: "no-store"
  });

  const data = (await response.json()) as SpotifyTokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(data.error ?? "Spotify token refresh failed.");
  }

  return data.access_token;
}

function createPreviewTracks(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const trackNumber = index + 1;

    return {
      id: `preview-${trackNumber}`,
      title: `Preview liked song ${trackNumber.toString().padStart(2, "0")}`,
      artist: "Spotify preview",
      album: "Local layout test",
      albumArt: "",
      spotifyUrl: "",
      addedAt: new Date(Date.now() - index * 60 * 60 * 1000).toISOString(),
      durationMs: 180000 + index * 3000
    };
  });
}
