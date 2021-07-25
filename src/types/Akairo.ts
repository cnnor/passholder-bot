import type { ComponentHandler } from '../structures';
import type { Logger } from '../utils/Logger';

declare module 'discord-akairo' {
  export interface AkairoClient {
    listenerHandler: ListenerHandler;
    inhibitorHandler: InhibitorHandler;
    commandHandler: CommandHandler;
    componentHandler: ComponentHandler;
    log: Logger;
  }
}
