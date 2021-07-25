import type { ListenerHandler, InhibitorHandler, CommandHandler } from 'discord-akairo';
import type { Collection } from 'discord.js';
import type { Component, ComponentHandler } from '../structures';
import type { Logger } from '../utils/Logger';

declare module 'discord-akairo' {
  export interface AkairoClient {
    components: Collection<string, Component>;
    listenerHandler: ListenerHandler;
    inhibitorHandler: InhibitorHandler;
    commandHandler: CommandHandler;
    componentHandler: ComponentHandler;
    log: Logger;
  }
}
