import { fileSize } from '@zodash/file-size';
import * as Docker from 'dockerode';
import { timeAgo } from '@zodash/time-ago';
import { DOCKER_SOCK_PATH } from '../config';
import { printTable } from '../utils/printTable';

export interface ImagesOptions {
  all?: boolean;
}

export async function images(options?: ImagesOptions) {
  const docker = new Docker({ socketPath: DOCKER_SOCK_PATH });
  const images: Docker.ImageInfo[] = await docker
    .listImages(options) as any;

  const header = ['REPOSITORY', 'TAG', 'IMAGE ID', 'CREATED', 'SIZE'];
  const list: string[][] = images
    .filter((image) => image.RepoTags?.length > 0)
    .map((image) => {
      const repo = image.RepoTags[0];
      const [name, tag] = repo.split(':');
      return [
        name,
        tag,
        image.Id.slice(7, 19),
        timeAgo(image.Created * 1000),
        fileSize(image.Size),
      ];    
    });

  return printTable(header, list);
}

