"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Music2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  spotifyUrl: string;
  addedAt: string;
  durationMs: number;
};

type SpotifyResponse = {
  configured: boolean;
  preview: boolean;
  tracks: SpotifyTrack[];
  error?: string;
};

export function RecentSpotifyLikes({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<SpotifyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadTracks() {
    setLoading(true);

    try {
      const response = await fetch("/api/spotify/recent-likes", {
        cache: "no-store"
      });
      const nextData = (await response.json()) as SpotifyResponse;
      setData(nextData);
    } catch {
      setData({
        configured: false,
        preview: false,
        tracks: [],
        error: "Could not load Spotify likes."
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTracks();
  }, []);

  const tracks = data?.tracks ?? [];
  const statusLabel = useMemo(() => {
    if (data?.preview) {
      return "Preview data";
    }

    if (data?.configured) {
      return "Spotify linked";
    }

    return "Not connected";
  }, [data?.configured, data?.preview]);

  return (
    <Card className="bg-card/75">
      <CardContent className={cn("p-5 sm:p-6", compact && "p-4 sm:p-5")}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Spotify</Badge>
              <Badge variant={data?.configured ? "default" : "amber"}>
                {statusLabel}
              </Badge>
            </div>
            <h2 className={cn("mt-4 font-semibold", compact ? "text-xl" : "text-2xl")}>
              Recently liked songs
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {compact
                ? "Latest 20 saved tracks from Spotify."
                : "The latest 20 tracks saved to my Spotify library, shown as a small public music feed."}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            disabled={loading}
            onClick={loadTracks}
          >
            <RefreshCw
              className={cn("h-4 w-4", loading && "animate-spin")}
              aria-hidden="true"
            />
            Refresh
          </Button>
        </div>

        {data?.error ? (
          <div className="mt-5 rounded-md border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            {data.error}
          </div>
        ) : null}

        {loading ? (
          <div className={cn("mt-6 grid gap-3", !compact && "md:grid-cols-2")}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-md border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        ) : null}

        {!loading && tracks.length ? (
          <div
            className={cn(
              "mt-6 grid gap-3",
              compact
                ? "max-h-[520px] overflow-y-auto pr-1"
                : "md:grid-cols-2"
            )}
          >
            {tracks.map((track, index) => (
              <TrackCard
                key={track.id}
                track={track}
                index={index}
                compact={compact}
              />
            ))}
          </div>
        ) : null}

        {!loading && !tracks.length ? (
          <div className="mt-6 grid min-h-44 place-items-center rounded-md border border-dashed border-white/15 bg-black/[0.16] p-6 text-center">
            <div>
              <Music2 className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">Spotify is not connected yet</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Add Spotify server credentials later and this section can show
                the 20 most recent liked songs automatically.
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function TrackCard({
  track,
  index,
  compact
}: {
  track: SpotifyTrack;
  index: number;
  compact: boolean;
}) {
  const content = (
    <div
      className={cn(
        "group flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 transition-colors hover:border-primary/25 hover:bg-white/[0.055]",
        compact ? "min-h-20" : "min-h-24"
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-md border border-white/10 bg-primary/10",
          compact ? "h-14 w-14" : "h-16 w-16"
        )}
      >
        {track.albumArt ? (
          <img
            src={track.albumArt}
            alt={`${track.album} cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_25%,rgba(31,214,154,0.35),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]">
            <Music2 className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-primary">
            #{(index + 1).toString().padStart(2, "0")}
          </p>
          {track.spotifyUrl ? (
            <ExternalLink
              className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
          ) : null}
        </div>

        <h3 className="mt-1 truncate text-sm font-semibold">{track.title}</h3>
        <p className="truncate text-xs leading-5 text-muted-foreground">
          {track.artist}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Liked {formatDate(track.addedAt)} - {formatDuration(track.durationMs)}
        </p>
      </div>
    </div>
  );

  if (!track.spotifyUrl) {
    return content;
  }

  return (
    <a
      href={track.spotifyUrl}
      target="_blank"
      rel="noreferrer"
      className="focus-ring rounded-md"
    >
      {content}
    </a>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "recently";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(date);
}

function formatDuration(value: number) {
  if (!value) {
    return "";
  }

  const minutes = Math.floor(value / 60000);
  const seconds = Math.round((value % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
