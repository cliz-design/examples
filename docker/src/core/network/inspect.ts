import * as Docker from 'dockerode';
import { DOCKER_SOCK_PATH } from '../../config';

export interface InspectOptions {

}

export async function inspect(id: string, _options?: InspectOptions) {
  const docker = new Docker({ socketPath: DOCKER_SOCK_PATH });
  const network = await docker
    .getNetwork(id)
    .inspect();

  console.log(JSON.stringify(network, null, 2));
}

