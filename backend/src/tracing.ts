import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

const resource = Resource.default().merge(
    new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'todo-service'
    })
)

const traceExporter = new OTLPTraceExporter({
    url: 'grpc://localhost:4317'
})

const sdk = new NodeSDK({
    resource,
    traceExporter:traceExporter,
    instrumentations: [getNodeAutoInstrumentations()]
})

sdk.start();