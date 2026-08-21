import { cn } from "@/lib/utils";
import { serverFetch } from "@/lib/server-fetch";
import { demoAds } from "@/lib/mock-data/ads";
import { AdBanner } from "./ad-banner";
import type { AdPosition, Advertisement } from "@/types/advertisement";

/**
 * Renders the active creative for a placement.
 * Falls back to polished local demo ads when the API has nothing active.
 */
export async function AdSlot({
  position,
  className,
}: {
  position: AdPosition;
  className?: string;
}) {
  const remote = await serverFetch<Advertisement>(
    "/advertisements/active",
    { position },
    { revalidate: 60 },
  );

  const ad = remote ?? demoAds[position];

  return (
    <div className={cn(className)}>
      <AdBanner ad={ad} />
    </div>
  );
}
