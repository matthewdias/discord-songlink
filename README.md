#### Usage

- React with a music service emoji to receive a link in DM for that service.
- `@<botname> <service> <links>` to receive a link in channel

#### Installation

##### Use our hosted instance

[Invite to server](https://discordapp.com/api/oauth2/authorize?client_id=461312892139077635&permissions=1073810432&scope=bot)

##### Or host it yourself

1. Create a Discord bot [here](https://discordapp.com/developers/applications/me/create)
2. Deploy the app

    [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

3. Invite it to a server at `https://discordapp.com/oauth2/authorize?client_id=<your bot client id>&scope=bot&permissions=1073810432`

#### Privacy Policy

Your messages are only read anonymously to find links. They are never stored or viewed by humans.

#### Development

##### Dependencies

- Node.js: Install from https://nodejs.org/

##### Running

1. run `npm install`
2. set environment variables
  - `CLIENT_ID`: Discord bot client. Get one [here](https://discordapp.com/developers/applications/me/create)
  - `TOKEN`: Discord bot token. Get one [here](https://discordapp.com/developers/applications/me/create)
3. run `npm start`

##### Docker
1. Clone the repo `git clone https://github.com/matthewdias/discord-songlink`
2. Build the docker container `docker build -t discord-songlink .`
3. Create the container `docker create --name=discord-songlink -e CLIENT_ID=<clientid> -e TOKEN=<token> -d discord-songlink`
4. Start the container `docker start mentionbot`
