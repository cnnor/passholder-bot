import { AkairoHandler, AkairoError } from 'discord-akairo';
import type { AkairoClient, AkairoHandlerOptions } from 'discord-akairo';
import type { Channel } from 'discord.js';
import { Component } from './Component';
import { isDMChannel } from '../../utils';

export class ComponentHandler extends AkairoHandler {
  constructor(
    client: AkairoClient,
    {
      directory,
      classToHandle = Component,
      extensions = ['.js', '.ts'],
      automateCategories,
      loadFilter,
    }: AkairoHandlerOptions
  ) {
    if (!(classToHandle.prototype instanceof Component || classToHandle === Component)) {
      throw new AkairoError('INVALID_CLASS_TO_HANDLE');
    }

    super(client, {
      directory,
      classToHandle,
      extensions,
      automateCategories,
      loadFilter,
    });

    this.setup();
  }

  private setup() {
    this.client.once('ready', () => {
      this.client.on('interactionCreate', async (interaction) => {
        if (!interaction.isMessageComponent()) return;
        const component = this.modules.find((x) => interaction.customId.includes(x.id)) as Component | undefined;
        if (!component) return;
        if (component.dmOnly) {
          const channel = (interaction.channel ??
            (await this.client.channels.fetch(interaction.channelId!))) as Channel;
          if (channel && !isDMChannel(channel)) return;
        }

        try {
          await component.exec(interaction);
        } catch (e) {
          this.client.log.error(`Interaction with ID ${component.customId} failed! ${e}`);
        }
      });
    });
  }
}
