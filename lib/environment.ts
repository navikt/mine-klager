export const isDeployedToDev = process.env.NAIS_CLUSTER_NAME === 'dev-gcp';
export const isDeployedToProd = process.env.NAIS_CLUSTER_NAME === 'prod-gcp';
export const isDeployed = isDeployedToDev || isDeployedToProd;
export const isLocal = !isDeployed;
