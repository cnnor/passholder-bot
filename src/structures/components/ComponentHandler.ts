import { AkairoHandler, AkairoError } from 'discord-akairo';
import type { AkairoClient, AkairoHandlerOptions } from 'discord-akairo';
import { Component } from './Component';

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

        this.modules.forEach(async (module) => {
          if ((module as Component).customId.test(interaction.customId)) {
            await (module as Component).exec(interaction);
            return true;
          }

          return false;
        });
      });
    });
  }
}
