import { DMChannel, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import type { MessageComponentInteraction, TextChannel, Message, User } from 'discord.js';
import { Component } from '../../../structures';
import { Embeds, ActionRows, isValidEmail } from '../../../utils';

export default class YesPassHolderComponent extends Component {
  constructor() {
    super('yesPassHolder', { customId: 'yesPassHolder', dmOnly: true });
  }

  // eslint-disable-next-line class-methods-use-this
  private static async getEmail(interaction: MessageComponentInteraction): Promise<string> {
    return new Promise((resolve, reject) => {
      const channel = interaction.channel as DMChannel;

      const filter = (message: Message) => {
        return message.author.id === interaction.user.id;
      };

      channel.awaitMessages({ max: 1, filter }).then((responses) => {
        const email = responses.first();

        if (email && isValidEmail(email.content)) {
          resolve(email.content);
        } else {
          reject();
        }
      });
    });
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
      const email = await YesPassHolderComponent.getEmail(interaction);
      this.sendToQueue(interaction.user, email);
      interaction.channel!.send({ embeds: [Embeds.waitForVerification] });
    } catch {
      interaction.channel!.send({ embeds: [Embeds.invalidEmail], components: [ActionRows.retry] });
    }

    return false;
  }
}
