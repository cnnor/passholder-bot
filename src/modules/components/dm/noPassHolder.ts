import { MessageComponentInteraction } from 'discord.js';
import { Component } from '../../../structures';
import { ActionRows, Embeds } from '../../../utils';

export default class NoPassHolderComponent extends Component {
  constructor() {
    super('noPassHolder', { customId: 'noPassHolder', dmOnly: true });
  }

  // eslint-disable-next-line class-methods-use-this
  async exec(interaction: MessageComponentInteraction): Promise<boolean> {
    await interaction.update({ embeds: [Embeds.isNotPassHolder], components: [ActionRows.change] });
    return true;
  }
}
