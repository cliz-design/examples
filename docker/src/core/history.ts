import { timeAgo } from '@zodash/time-ago';
import * as Docker from 'dockerode';
import { fileSize } from '@zodash/file-size';
import { DOCKER_SOCK_PATH } from '../config';
import { printTable } from '../utils/printTable';

export interface HistoryOptions {

}

export interface History {
  Id: string;
  Created: number;
  CreatedBy: string;
  Size: number;
  Comment: string;
  Tags: string[] | null;
}

export async function history(id: string, _options?: HistoryOptions) {
  const docker = new Docker({ socketPath: DOCKER_SOCK_PATH });
  const histories: History[] = await docker
    .getImage(id)
    .history();

  printTable(
    ['IMAGE', 'CREATED', 'CREATED BY', 'SIZE', 'COMMENT'],
    histories.map((history) => {
      return [
        history.Id.slice(0, 12),
        timeAgo(history.Created * 1000),
        (history.CreatedBy.replace(new RegExp('\\t', 'g'), ' ').slice(0, 44) + '…').padEnd(45, ' '),
        fileSize(history.Size),
        history.Comment,
      ];
    }),
  );
}

