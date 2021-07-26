import type { AkairoClient } from 'discord-akairo';
import type { GuildMember, Snowflake, Channel, DMChannel, Message, MessageEmbed, TextChannel } from 'discord.js';
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

export async function promptString(
  channel: TextChannel | DMChannel,
  id: string,
  embed?: MessageEmbed
): Promise<string | undefined> {
  // prompt and ask for input
  if (embed) await channel.send({ embeds: [embed] });
  const prompt = await channel
    .awaitMessages({
      filter: (pM: Message) => pM.author.id === id,
      max: 1,
      time: 60000,
      errors: ['time'],
    })
    .then((x) => x.first())
    .catch((x) => x.first());
  return prompt?.content;
}

export async function promptQuestion(
  channel: TextChannel | DMChannel,
  id: string,
  embed?: MessageEmbed
): Promise<string> {
  const input = await promptString(channel, id, embed);
  // input will only be blank if a person does not answer in time
  if (!input) throw new Error('TIMEOUT');
  // if input is too long
  if (input.length > 75) throw new Error('TOO_LONG');
  return input;
}
