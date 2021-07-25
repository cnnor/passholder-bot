import { MessageComponentInteraction } from 'discord.js';
import { Component } from '../../../structures';

export default class ChangePassHolderComponent extends Component {
  constructor() {
    super('changePassHolder', { customId: 'changePassHolder', dmOnly: true });
  }

  async exec(interaction: MessageComponentInteraction): Promise<boolean> {
    (this.client.componentHandler.modules.get('yesPassHolder') as Component).exec(interaction);
    return true;
  }
}
