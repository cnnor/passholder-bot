import { MessageComponentInteraction, MessageEmbed } from 'discord.js';
import type { Snowflake } from 'discord.js';
import { codeBlock } from '@discordjs/builders';
import { Component } from '../../../structures';
import { Embeds, getUserFromId } from '../../../utils';

export default class YesVerifyComponent extends Component {
  constructor() {
    super('yesVerify', { customId: /(?:yesVerify)-[0-9]{18}/ });
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

    member.roles
      .add(process.env.ROLE_ID as Snowflake)
      .then(() => {
        const oldEmbed = interaction.message.embeds[0] as MessageEmbed;
        const newEmbed = new MessageEmbed(oldEmbed).setTitle('Verified').setColor('GREEN');

        interaction.update({ embeds: [newEmbed], components: [] });
        member.send({ embeds: [Embeds.youWereVerified] });

        return false;
      })
      .catch((err) => {
        const embed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Error')
          .setDescription(`Encountered an error while applying the role.\n${codeBlock(err)}`);
        interaction.reply({ embeds: [embed] });

        return false;
      });

    return true;
  }
}
