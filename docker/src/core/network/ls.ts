import * as Docker from 'dockerode';
import { DOCKER_SOCK_PATH } from '../../config';
import { printTable } from '../../utils/printTable';

export interface LsOptions {
  // all?: boolean;
}

export async function ls(options?: LsOptions) {
  const docker = new Docker({ socketPath: DOCKER_SOCK_PATH });
  const networks = await docker
    .listNetworks(options);

  const header = ['NETWORK ID', 'NAME', 'DRIVER', 'SCOPE'];
  const list: string[][] = networks
    // .filter((network) => !/^sha256/.test(network.Image))
    .map((network) => {
      return [
        network.Id.slice(0, 12),
        network.Name,
        network.Driver,
        network.Scope,
      ];    
    });

  return printTable(header, list);
}

