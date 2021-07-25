import { Command } from 'discord-akairo';
import { codeBlock } from '@discordjs/builders';
import { Message, MessageEmbed } from 'discord.js';
import { inspect } from 'util';

export default class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval'],
      ownerOnly: true,
      args: [{ id: 'code', type: 'string', match: 'rest' }],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static async clean(content: any): Promise<string> {
    let processed = content;
    if (content?.then && content.catch) processed = await content;
    if (typeof content !== 'string') processed = inspect(content, { depth: 0 });

    return (
      (processed as string)
        .replace(/`/g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .replace(process.env.TOKEN!, '[TOKEN]')
    );
  }

  async exec(message: Message, args: { code: string }): Promise<boolean> {
    this.client.log.warn('[Commands] Someone used the evaluate command.');

    try {
      // eslint-disable-next-line no-eval
      const evaluatedCode = await eval(`(async () => {${args.code}})()`);
      const safeEvaluatedCode = await EvalCommand.clean(evaluatedCode);

      const embed = new MessageEmbed()
        .setTitle('Evaluated Code')
        .setColor('BLURPLE')
        .setDescription(codeBlock('js', safeEvaluatedCode))
        .setTimestamp();

      if (embed.length > 6000) {
        await message.reply({ content: 'Sorry, the result of that code was too long.' });
        return true;
      }

      await message.reply({ embeds: [embed] });
      return true;
    } catch (err) {
      const safeErrorMessage = await EvalCommand.clean(err);

      const embed = new MessageEmbed()
        .setTitle('Uh-oh.')
        .setColor('RED')
        .setDescription(codeBlock(safeErrorMessage))
        .setTimestamp();

      if (embed.length > 6000) {
        await message.reply({ content: 'I encountered an error, but the message was too long.' });
        return true;
      }

      await message.reply({ embeds: [embed] });
      return true;
    }
  }
}
