<p align="center">
  <h3 align="center">Pass Holder Bot</h3>

  <p align="center">
    A bot for verifying Summer Pass Holders at Fiveable.
  </p>
</p>

## ℹ️ About The Project

This project won't be useful for anyone who doesn't need to verify Summer Pass Holders at Fiveable. Sorry.

## ⚙️ Installation

1. Use `git clone` to copy the repository to your machine.
2. Run `yarn install` to install all of the project dependencies.
3. Change the environment variables in `.env` to include a bot token, IDs for your server setup, and a prefix.
4. Run the bot with `yarn run start:dev`, `yarn run start:prod`, or build with `yarn run build` and run with a service like PM2.

## 🧰 Usage

1. When a user joins the server, they will be sent a welcome message along with a prompt.
2. If a user clicks yes, they are prompted for their email address, which is then sent to a queue channel for manual verification.
3. If a user clicks no, they are given some information about the program.
4. When a queue entry is verified, the user will be given a role (as specified in the environment variables) and then sent a confirmation message.
5. If a queue entry is denied, the user will be sent a message prompting them to retry with a different email.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
