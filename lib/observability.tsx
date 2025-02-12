import { isDeployedToDev, isDeployedToProd } from '@/lib/environment';
import { LogLevel, type PushLogOptions, faro, getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

const getUrl = () => {
  if (isDeployedToProd) {
    return 'https://telemetry.prod-gcp.nav.cloud.nais.io/collect';
  }

  if (isDeployedToDev) {
    return 'https://telemetry.dev-gcp.nav.cloud.nais.io/collect';
  }

  return '/collect';
};

export const initialize = () =>
  initializeFaro({
    url: getUrl(),
    app: { name: 'mine-klager' },
    paused: true, // Initialize as paused to avoid sending events before consent is given.
    batching: {
      enabled: true,
      sendTimeout: isDeployedToProd ? 250 : 30000,
      itemLimit: isDeployedToProd ? 50 : 100,
    },
    instrumentations: [...getWebInstrumentations({ captureConsole: false }), new TracingInstrumentation()],
  });

export const pushEvent = (name: string, domain: string, attributes?: Record<string, string>) =>
  faro.api.pushEvent(name, { ...attributes, domain }, domain, { skipDedupe: true });

export const pushLog = (message: string, options?: Omit<PushLogOptions, 'skipDedupe'>, level = LogLevel.DEBUG) =>
  faro.api.pushLog([message], { ...options, skipDedupe: true, level });
