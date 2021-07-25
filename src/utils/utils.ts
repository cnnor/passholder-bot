import type { AkairoClient } from 'discord-akairo';
import type { GuildMember, Snowflake, Channel, DMChannel } from 'discord.js';

export function formatSize(bytes: number): string {
  const kilo = bytes / 1024;
  const mega = kilo / 1024;
  const giga = mega / 1024;

  if (kilo < 1024) return `${kilo.toFixed(1)}KB`;
  if (kilo > 1024 && mega < 1024) return `${mega.toFixed(1)}MB`;
  return `${giga.toFixed(1)}GB`;
}

export function isValidEmail(email: string): boolean {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return pattern.test(email.toLowerCase());
}

export function getUserFromId(client: AkairoClient, guildId: string, userId: string): GuildMember | null {
  const guild = client.guilds.cache.get(guildId as Snowflake);
  if (!guild) return null;

  const member = guild.members.cache.get(userId as Snowflake);
  if (!member) return null;

  return member;
}

export function isDMChannel(channel: Channel): channel is DMChannel {
  return channel.type === 'DM';
}
