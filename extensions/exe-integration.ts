const REFLECTION_INTEGRATIONS_ENDPOINT =
  "https://reflection.int.exe.xyz/integrations";
const DISCOVERY_TIMEOUT_MS = 1_000;

interface ExeIntegrationEndpointOptions<
  PublicEndpoint extends string,
  IntegrationEndpoint extends string,
> {
  integrationName: string;
  integrationEndpoint: IntegrationEndpoint;
  publicEndpoint: PublicEndpoint;
}

/**
 * Resolve and cache an exe.dev credential-injecting endpoint when its named
 * integration is attached, falling back to the public endpoint everywhere else.
 */
export function createExeIntegrationEndpointResolver<
  PublicEndpoint extends string,
  IntegrationEndpoint extends string,
>({
  integrationName,
  integrationEndpoint,
  publicEndpoint,
}: ExeIntegrationEndpointOptions<
  PublicEndpoint,
  IntegrationEndpoint
>): () => Promise<PublicEndpoint | IntegrationEndpoint> {
  let cached: Promise<PublicEndpoint | IntegrationEndpoint> | undefined;
  const integrationHostname = new URL(integrationEndpoint).hostname;

  return () =>
    (cached ??= (async () => {
      try {
        const response = await fetch(REFLECTION_INTEGRATIONS_ENDPOINT, {
          signal: AbortSignal.timeout(DISCOVERY_TIMEOUT_MS),
        });
        if (response.ok) {
          const data = (await response.json()) as { integrations?: unknown };
          const integrations = Array.isArray(data.integrations)
            ? data.integrations
            : [];
          const attached = integrations.some((value: unknown) => {
            if (!value || typeof value !== "object") return false;
            const integration = value as Record<string, unknown>;
            return (
              integration.name === integrationName ||
              (typeof integration.help === "string" &&
                integration.help.includes(integrationHostname))
            );
          });
          if (attached) return integrationEndpoint;
        }
      } catch {
        // Expected off exe.dev, when Reflection is detached, or on timeout.
      }
      return publicEndpoint;
    })());
}
