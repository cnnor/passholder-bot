import { DMChannel, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import type { MessageComponentInteraction, TextChannel, User } from 'discord.js';
import { Component } from '../../../structures';
import { Embeds, ActionRows, isValidEmail, promptQuestion } from '../../../utils';

export default class YesPassHolderComponent extends Component {
  constructor() {
    super('yesPassHolder', { customId: 'yesPassHolder', dmOnly: true });
  }

  private async sendToQueue(user: User, email: string): Promise<void> {
    const queueChannel = this.client.channels.cache.get(process.env.CHANNEL_ID) as TextChannel;

    const embed = new MessageEmbed()
      .setTitle('Pending Verification')
      .setThumbnail(user.displayAvatarURL())
      .addField('User', `${user.tag} \`(${user.id})\``, false)
      .addField('Email', `${email}`, false)
      .setColor('ORANGE')
      .setTimestamp();

    const buttons = new MessageActionRow().addComponents([
      new MessageButton().setCustomId(`yesVerify-${user.id}`).setLabel('Verify').setStyle('SUCCESS'),
      new MessageButton().setCustomId(`noVerify-${user.id}`).setLabel('Deny').setStyle('DANGER'),
    ]);

    queueChannel.send({ embeds: [embed], components: [buttons] });
  }

  async exec(interaction: MessageComponentInteraction): Promise<boolean> {
    await interaction.update({ embeds: [Embeds.askForEmail], components: [] });

    try {
      const email = await promptQuestion(interaction.channel as TextChannel | DMChannel, interaction.user.id);
      if (!isValidEmail(email)) throw new Error('Invalid Email.');
      this.sendToQueue(interaction.user, email);
      interaction.channel!.send({ embeds: [Embeds.waitForVerification] });
    } catch (e) {
      let embeds: MessageEmbed[];

      if (e.message === 'TIMEOUT') {
        embeds = [Embeds.outOfTime];
      } else if (e.message === 'TOO_LONG') {
        embeds = [Embeds.tooLong];
      } else {
        embeds = [Embeds.invalidResponse];
      }

      interaction.channel!.send({ embeds, components: [ActionRows.retry] });
    }

    return false;
  }
}
