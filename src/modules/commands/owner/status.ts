import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { codeBlock } from '@discordjs/builders';
import prettyMs from 'pretty-ms';
import { getHeapStatistics } from 'v8';

import { formatSize } from '../../../utils';

export default class StatusCommand extends Command {
  constructor() {
    super('status', {
      aliases: ['status', 'stats'],
      ownerOnly: true,
    });
  }

  private async getPing(message: Message): Promise<string[]> {
    const ws = Math.round(this.client.ws.ping);
    const sent = await message.channel.send('Calculating ping.');
    const ping = Math.round(sent.createdAt.getTime() - message.createdAt.getTime());
    const uptime = Math.round(this.client.uptime ?? 0);

    sent.delete();

    return [`Message TTL: ${ping}ms`, `WebSocket Ping: ${ws}ms`, `Uptime: ${prettyMs(uptime)}`];
  }

  private static async getMemoryStats(): Promise<string[]> {
    const heap = getHeapStatistics();
    return [
      `Allocated: ${formatSize(heap.malloced_memory)}`,
      `Heap Limit: ${formatSize(heap.heap_size_limit)}`,
      `Used Heap: ${formatSize(heap.used_heap_size)}/${formatSize(heap.total_heap_size)}`,
      `Physical Size: ${formatSize(heap.total_physical_size)}`,
    ];
  }

  private async getModuleStats(): Promise<string[]> {
    return [
      `Commands: ${this.client.commandHandler.modules.size}`,
      `Listeners: ${this.client.listenerHandler.modules.size}`,
      `Inhibitors: ${this.client.inhibitorHandler.modules.size}`,
    ];
  }

  async exec(message: Message): Promise<boolean> {
    const embed = new MessageEmbed().setTitle('Bot Status').setColor('#2f3136');

    const ping = await this.getPing(message);
    const memory = await StatusCommand.getMemoryStats();
    const modules = await this.getModuleStats();

    embed.addFields([
      {
        name: '❯ Ping',
        value: codeBlock(ping.join('\n')),
        inline: false,
      },
      {
        name: '❯ Memory',
        value: codeBlock(memory.join('\n')),
        inline: false,
      },
      {
        name: '❯ Modules',
        value: codeBlock(modules.join('\n')),
        inline: false,
      },
    ]);

    message.channel.send({ embeds: [embed] });
    return true;
  }
}
