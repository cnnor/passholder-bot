import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';
import type { MessageComponentInteraction } from 'discord.js';

export interface ComponentOptions extends AkairoModuleOptions {
  customId: string | RegExp;
}

export abstract class Component extends AkairoModule {
  public customId: RegExp;

  constructor(id: string, { category, customId }: ComponentOptions) {
    super(id, { category });

    if (typeof customId === 'string') {
      this.customId = RegExp(`(?:${customId})`);
    } else {
      this.customId = customId;
    }
  }

  abstract exec(interaction: MessageComponentInteraction): boolean | Promise<boolean>;
}
