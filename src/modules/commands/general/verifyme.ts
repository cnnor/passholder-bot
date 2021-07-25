import { Command } from 'discord-akairo';
import type { Message } from 'discord.js';
import { Embeds, ActionRows } from '../../../utils';

export default class VerifyMeCommand extends Command {
  constructor() {
    super('verifyMe', {
      aliases: ['verifyme'],
      description: 'Get yourself verified.',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async exec(message: Message): Promise<boolean> {
    message.member
      ?.send({
        embeds: [Embeds.initialPrompt],
        components: [ActionRows.welcome],
      })
      .then(() => {
        message.delete();
      })
      .catch(() => {
        message.reply('Sorry, I had some trouble sending you a message. Are your DMs open?');
        return false;
      });

    return true;
  }
}
