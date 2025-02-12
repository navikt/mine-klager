export const isDeployedToDev = process.env.NAIS_CLUSTER_NAME === 'dev-gcp';
export const isDeployedToProd = process.env.NAIS_CLUSTER_NAME === 'prod-gcp';
export const isDeployed = isDeployedToDev || isDeployedToProd;
export const isLocal = !isDeployed;

export const NAIS_NAMESPACE = process.env.NAIS_NAMESPACE ?? 'local';

export const POD_NAME = process.env.OTEL_RESOURCE_ATTRIBUTES_POD_NAME ?? 'local';
