import { MessageComponentInteraction } from 'discord.js';
import type { Channel, Snowflake } from 'discord.js';
import { Component } from '../../../structures';
import { isDMChannel } from '../../../utils';

export default class ChangePassHolderComponent extends Component {
  constructor() {
    super('changePassHolder', { customId: 'changePassHolder' });
  }

  async exec(interaction: MessageComponentInteraction): Promise<boolean> {
    const channel = interaction.channel
      ? (interaction.channel as Channel)
      : ((await this.client.channels.fetch(interaction.channelId as Snowflake)) as Channel);

    if (!isDMChannel(channel)) return false;

    (this.client.componentHandler.modules.get('yesPassHolder') as Component).exec(interaction);
    return true;
  }
}
