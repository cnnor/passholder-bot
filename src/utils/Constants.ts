import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';

export const Colors = {
  FIVEABLE: '#01A0B6' as const,
  BLANK: '#2F3136' as const,
};

export const ActionRows = {
  welcome: new MessageActionRow().addComponents([
    new MessageButton().setCustomId('yesPassHolder').setLabel('Yes').setStyle('SECONDARY').setEmoji('👍'),
    new MessageButton().setCustomId('noPassHolder').setLabel('No').setStyle('SECONDARY').setEmoji('👎'),
  ]),
  change: new MessageActionRow().addComponents([
    new MessageButton()
      .setCustomId('changePassHolder')
      .setLabel('Actually, I am a pass holder!')
      .setStyle('SECONDARY')
      .setEmoji('🥳'),
  ]),
  retry: new MessageActionRow().addComponents([
    new MessageButton().setCustomId('changePassHolder').setLabel('Retry').setStyle('SECONDARY').setEmoji('🔁'),
  ]),
};

export const Embeds = {
  tooLong: new MessageEmbed()
    .setColor('RED')
    .setTitle('Oh no! Your input was too large!')
    .setDescription('Would you like to retry?'),
  outOfTime: new MessageEmbed()
    .setColor('RED')
    .setTitle('Oh no, you ran out of time!')
    .setDescription('Would you like to retry?'),
  welcome: new MessageEmbed()
    .setTitle('Hey, welcome to the Fiveable College Program Community!')
    .setDescription('Before you dive-in... [this will be finished later].')
    .addField(
      "👋 Let's get you started.",
      'Share your story in `#introductions` so we can get to know you, and make sure to read up on our community guidelines in #welcome.',
      false
    )
    .addField(
      '✅ Add some roles.',
      'Check out `#add-roles` and select some roles for yourself. Some of these roles will give you access to private channels for AP subjects, special interests, and identity groups. Feel free to add a pronoun role as well, so we know how you want to be addressed.',
      false
    )
    .addField(
      '📅 Check out our programs.',
      'Explore the #events channel for up-to-date information on our current programs. Game nights, study sessions, self-care groups, and Language Clusters will all be announced here.',
      false
    )
    .setColor(Colors.FIVEABLE),
  initialPrompt: new MessageEmbed()
    .setTitle('Are you a pass holder?')
    .setDescription(
      'Our community is open to everyone, but with a [Summer College Program Pass](https://shop.fiveable.me/products/college-program-pass), you get access to some awesome college resources. Have you already purchased a pass?'
    )
    .setColor(Colors.FIVEABLE),
  isNotPassHolder: new MessageEmbed()
    .setTitle('No worries!')
    .setDescription(
      'Our community is open to everyone. If you ever change your mind, you can purchase a pass [here](https://shop.fiveable.me/products/college-program-pass) and then hit the button below. In the meantime, enjoy some of our free events and resources.'
    )
    .setColor(Colors.FIVEABLE),
  askForEmail: new MessageEmbed()
    .setTitle('Awesome!')
    .setDescription(
      "We'll need to verify your pass. What email did you use for the purchase? Make sure to type it exactly as it appears on your receipt."
    )
    .setColor(Colors.FIVEABLE),
  waitForVerification: new MessageEmbed()
    .setTitle('Thanks for your patience.')
    .setDescription(
      "Our interns will work on getting you verified, and we'll send you a message once that's done. In the meantime, please enjoy some of our free events and resources."
    )
    .setColor(Colors.FIVEABLE),
  invalidEmail: new MessageEmbed()
    .setTitle('Whoops!')
    .setDescription("That doesn't seem to be a valid email address. Would you like to retry?")
    .setColor(Colors.FIVEABLE),
  youWereVerified: new MessageEmbed()
    .setTitle("You're verified!")
    .setDescription(
      'Thanks for waiting. Your Pass Holder role has been applied, and you can now access exclusive content on our Discord server.'
    )
    .setColor(Colors.FIVEABLE),
  youWereDenied: new MessageEmbed()
    .setTitle("We couldn't verify your pass.")
    .setDescription(
      'We were unable to verify your pass holder status using the email you provided. Would you like to retry with another email?'
    )
    .setColor(Colors.FIVEABLE),
};
