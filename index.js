const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.on('guildMemberAdd', async (member) => {
  if (member.user.bot) return;

  const name = member.user.globalName || member.user.username;

  try {
    await member.setNickname(`Notty ${name}`);
    console.log(`Renamed ${name}`);
  } catch (err) {
    console.log("Error:", err);
  }
});

client.login(process.env.TOKEN);
