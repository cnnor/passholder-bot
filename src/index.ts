import { config } from 'dotenv';
import { join } from 'path';

import './types/Akairo';
import { Client } from './structures';

config({ path: join(__dirname, '..', '.env') });

['TOKEN', 'OWNER_ID', 'PREFIX', 'GUILD_ID', 'CHANNEL_ID', 'ROLE_ID'].forEach((variable) => {
  if (process.env[variable] === undefined) throw new Error(`Missing ${variable} environment variable.`);
});

const client = new Client();
client.start();
