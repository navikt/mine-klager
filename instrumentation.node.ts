import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { DnsInstrumentation } from '@opentelemetry/instrumentation-dns';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NetInstrumentation } from '@opentelemetry/instrumentation-net';
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'mine-klager',
  }),
  spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter()),
  instrumentations: [
    new DnsInstrumentation(),
    new HttpInstrumentation(),
    new NetInstrumentation(),
    new UndiciInstrumentation(),
  ],
});

sdk.start();

const shutdown = () => {
  sdk.shutdown().finally(() => process.exit(0));
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
