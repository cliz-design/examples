import * as Docker from 'dockerode';
import { timeAgo } from '@zodash/time-ago';
import { DOCKER_SOCK_PATH } from '../config';
import { printTable } from '../utils/printTable';

export interface PSOptions {
  all?: boolean;
}

export async function ps(options?: PSOptions) {
  const docker = new Docker({ socketPath: DOCKER_SOCK_PATH });
  const containers = await docker
    .listContainers(options);

  const header = ['CONTAINER ID', 'IMAGE', 'COMMAND', 'CREATED', 'STATUS', 'PORTS', 'NAMES'];
  const list: string[][] = containers
    .filter((container) => !/^sha256/.test(container.Image))
    .map((container) => {
      return [
        container.Id.slice(0, 12),
        container.Image,
        JSON.stringify(container.Command.slice(0, 19) + '…'),
        timeAgo(container.Created * 1000),
        container.Status,
        container.Ports.map((port) => {
          return `${port.IP}:${port.PublicPort}->${port.PrivatePort}/${port.Type}`;
        }).join(', '),
        container.Names.join(', '),
      ];    
    });

  return printTable(header, list);
}

