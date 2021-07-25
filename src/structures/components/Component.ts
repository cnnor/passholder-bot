import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';
import type { MessageComponentInteraction } from 'discord.js';

export interface ComponentOptions extends AkairoModuleOptions {
  customId: string | RegExp;
  dmOnly?: boolean;
}

export abstract class Component extends AkairoModule {
  public customId: RegExp;
  public dmOnly: boolean;

  constructor(id: string, { category, customId, dmOnly }: ComponentOptions) {
    super(id, { category });
    this.dmOnly = dmOnly ?? false;

    if (typeof customId === 'string') {
      this.customId = RegExp(`(?:${customId})`);
    } else {
      this.customId = customId;
    }
  }

  abstract exec(interaction: MessageComponentInteraction): boolean | Promise<boolean>;
}
