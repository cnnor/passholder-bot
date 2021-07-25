import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import type { Snowflake } from 'discord.js';
import { join } from 'path';

import { Logger } from '../utils';
import { ComponentHandler } from '.';

export class Client extends AkairoClient {
  public listenerHandler!: ListenerHandler;
  public inhibitorHandler!: InhibitorHandler;
  public commandHandler!: CommandHandler;
  public componentHandler!: ComponentHandler;

  public log: Logger;

  constructor() {
    super(
      { ownerID: process.env.OWNER_ID as Snowflake },
      {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
        messageCacheLifetime: 21600,
        messageSweepInterval: 43200,
        allowedMentions: { parse: ['roles', 'users'], repliedUser: true },
      }
    );

    this.log = new Logger();
  }

  private initializeHandlers() {
    const paths = {
      listeners: join(__dirname, '..', 'modules', 'listeners'),
      inhibitors: join(__dirname, '..', 'modules', 'inhibitors'),
      commands: join(__dirname, '..', 'modules', 'commands'),
      components: join(__dirname, '..', 'modules', 'components'),
    };

    this.listenerHandler = new ListenerHandler(this, {
      directory: paths.listeners,
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: paths.inhibitors,
    });

    this.commandHandler = new CommandHandler(this, {
      directory: paths.commands,
      prefix: '~',
      commandUtil: true,
    });

    this.componentHandler = new ComponentHandler(this, {
      directory: paths.components,
    });

    this.log.debug('[Client] Initialized handlers.');
  }

  private async loadModules() {
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    this.commandHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();
    this.componentHandler.loadAll();

    const stats = {
      listeners: this.listenerHandler.modules.size,
      commands: this.commandHandler.modules.size,
      inhibitors: this.inhibitorHandler.modules.size,
      components: this.componentHandler.modules.size,
    };

    this.log.debug(
      `[Client] Loaded modules. (${stats.listeners} Listeners, ${stats.inhibitors} Inhibitors, ${stats.commands} Commands, ${stats.components} Components)`
    );
  }

  async start(): Promise<void> {
    try {
      this.initializeHandlers();
      await this.loadModules();
      await this.login(process.env.TOKEN);

      this.log.success(`[Client] Successfully logged in as ${this.user?.tag}.`);
    } catch (err) {
      this.log.error('[Client] Encountered an error while starting.', err);
    }
  }
}
