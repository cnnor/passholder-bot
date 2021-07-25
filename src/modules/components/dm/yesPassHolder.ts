import { DMChannel, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import type { MessageComponentInteraction, TextChannel, Message, Snowflake, Channel, User } from 'discord.js';
import { Component } from '../../../structures';
import { Embeds, isValidEmail, isDMChannel } from '../../../utils';

export default class YesPassHolderComponent extends Component {
  constructor() {
    super('yesPassHolder', { customId: 'yesPassHolder' });
  }

  // eslint-disable-next-line class-methods-use-this
  private async getEmail(interaction: MessageComponentInteraction): Promise<string> {
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
          reject(new Error("Sorry, that doesn't appear to be a valid email address."));
        }
      });
    });
  }

  private async sendToQueue(user: User, email: string): Promise<void> {
    const queueChannel = this.client.channels.cache.get(process.env.CHANNEL_ID as Snowflake) as TextChannel;

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
    const channel = interaction.channel
      ? (interaction.channel as Channel)
      : ((await this.client.channels.fetch(interaction.channelId as Snowflake)) as Channel);

    if (!isDMChannel(channel)) return false;

    interaction.update({ embeds: [Embeds.askForEmail], components: [] });

    this.getEmail(interaction)
      .then((email) => {
        this.sendToQueue(interaction.user, email);
        channel.send({ embeds: [Embeds.waitForVerification] });
        return true;
      })
      .catch((err) => {
        interaction.editReply({ content: err.message });
        return false;
      });

    return false;
  }
}
