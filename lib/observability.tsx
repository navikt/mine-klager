import {
  type Faro,
  LogLevel,
  type PushLogOptions,
  getWebInstrumentations,
  initializeFaro,
} from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

class Grafana {
  private faro: Faro | null = null;

  private getUrl = () =>
    document.documentElement.getAttribute('data-environment') === 'prod-gcp'
      ? 'https://telemetry.nav.no/collect'
      : 'https://telemetry.ekstern.dev.nav.no/collect';

  public initialize = () => {
    this.faro = initializeFaro({
      url: this.getUrl(),
      app: { name: 'mine-klager' },
      paused: true, // Initialize as paused to avoid sending events before consent is given.
      instrumentations: [
        ...getWebInstrumentations({ captureConsole: false, enablePerformanceInstrumentation: true }),
        new TracingInstrumentation(),
      ],
    });
  };

  public unpause = () => this.faro?.unpause();

  public pushEvent = (name: string, domain: string, attributes?: Record<string, string>) =>
    this.faro?.api.pushEvent(name, { ...attributes, domain }, domain, { skipDedupe: true });

  public pushLog = (message: string, options?: Omit<PushLogOptions, 'skipDedupe'>, level = LogLevel.DEBUG) =>
    this.faro?.api.pushLog([message], { ...options, skipDedupe: true, level });

  public pushError = (error: Error) => this.faro?.api.pushError(error);
}

export const grafana = new Grafana();
