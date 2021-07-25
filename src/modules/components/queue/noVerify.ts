import { MessageComponentInteraction, MessageEmbed } from 'discord.js';
import { Component } from '../../../structures';
import { Embeds, ActionRows, getUserFromId } from '../../../utils';

export default class NoVerifyComponent extends Component {
  constructor() {
    super('noVerify', { customId: /(?:noVerify)-[0-9]{18}/ });
  }

  async exec(interaction: MessageComponentInteraction): Promise<boolean> {
    const userId = interaction.customId.split('-')[1];
    const member = getUserFromId(this.client, process.env.GUILD_ID, userId);

    if (!member) {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Error')
        .setDescription("Sorry, I couldn't find that member. They may have left the server.");

      interaction.reply({ embeds: [embed] });
      return false;
    }

    const oldEmbed = interaction.message.embeds[0] as MessageEmbed;
    const newEmbed = new MessageEmbed(oldEmbed).setTitle('Denied').setColor('RED');

    interaction.update({ embeds: [newEmbed], components: [] });
    member.send({ embeds: [Embeds.youWereDenied], components: [ActionRows.retry] });

    return true;
  }
}
