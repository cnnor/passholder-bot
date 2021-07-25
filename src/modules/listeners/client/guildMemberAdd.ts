import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { Embeds, ActionRows } from '../../../utils';

export default class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async exec(member: GuildMember): Promise<void> {
    await member.send({ embeds: [Embeds.welcome] }).catch(() => null);
    await member
      .send({
        embeds: [Embeds.initialPrompt],
        components: [ActionRows.welcome],
      })
      .catch(() => null);
  }
}
