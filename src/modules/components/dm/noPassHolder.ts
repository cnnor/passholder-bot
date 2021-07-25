import { MessageComponentInteraction } from 'discord.js';
import type { Channel, Snowflake } from 'discord.js';
import { Component } from '../../../structures';
import { ActionRows, Embeds, isDMChannel } from '../../../utils';

export default class NoPassHolderComponent extends Component {
  constructor() {
    super('noPassHolder', { customId: 'noPassHolder' });
  }

  async exec(interaction: MessageComponentInteraction): Promise<boolean> {
    const channel = interaction.channel
      ? (interaction.channel as Channel)
      : ((await this.client.channels.fetch(interaction.channelId as Snowflake)) as Channel);

    if (!isDMChannel(channel)) return false;

    interaction.update({ embeds: [Embeds.isNotPassHolder], components: [ActionRows.change] });
    return true;
  }
}
