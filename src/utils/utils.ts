import type { AkairoClient } from 'discord-akairo';
import type { GuildMember, Snowflake, Channel, DMChannel } from 'discord.js';
import * as EmailValidator from 'email-validator';

export function formatSize(bytes: number): string {
  const kilo = bytes / 1024;
  const mega = kilo / 1024;
  const giga = mega / 1024;

  if (kilo < 1024) return `${kilo.toFixed(1)}KB`;
  if (kilo > 1024 && mega < 1024) return `${mega.toFixed(1)}MB`;
  return `${giga.toFixed(1)}GB`;
}

export function isValidEmail(email: string): boolean {
  return EmailValidator.validate(email);
}

export function getUserFromId(client: AkairoClient, guildId: Snowflake, userId: Snowflake): GuildMember | null {
  const guild = client.guilds.cache.get(guildId);
  const member = guild?.members.cache.get(userId);
  return member ?? null;
}

export function isDMChannel(channel: Channel): channel is DMChannel {
  return channel.type === 'DM';
}
