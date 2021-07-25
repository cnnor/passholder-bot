// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN: string;
    OWNER_ID: string;
    PREFIX: string;
    GUILD_ID: string;
    CHANNEL_ID: string;
    ROLE_ID: string;
  }
}
