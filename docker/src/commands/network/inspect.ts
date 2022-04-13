import { defineSubCommand } from '@cliz/cli';

import { inspect } from '../../core/network/inspect';

export default defineSubCommand((createCommand) => {
  return createCommand('Display detailed information on one or more networks')
    .argument('<id>', 'Network ID')
    .action(async ({ args, options }) => {
      const id = args.id as string;
      await inspect(id, options);
    });
});
