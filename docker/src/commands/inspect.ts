import { defineSubCommand } from '@cliz/cli';

import { inspect } from '../core/inspect';

export default defineSubCommand((createCommand) => {
  return createCommand('Return low-level information on Docker objects')
    .argument('<id>', 'Container ID | NAME')
    .action(async ({ args, options }) => {
      const id = args.id as string;
      await inspect(id, options);
    });
});
