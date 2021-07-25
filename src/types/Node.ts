// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
    OWNER_ID: `${bigint}`;
    PREFIX: string;
    GUILD_ID: `${bigint}`;
    CHANNEL_ID: `${bigint}`;
    ROLE_ID: `${bigint}`;
  }
}
