const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// ===== DISCORD CLIENT =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ===== WHEN MEMBER JOINS =====
client.on('guildMemberAdd', async (member) => {
  if (member.user.bot) return;

  const name = member.user.globalName || member.user.username;

  try {
    await member.setNickname(`Notty ${name}`);
    console.log(`Renamed ${name}`);
  } catch (err) {
    console.log("Rename error:", err.message);
  }
});

// ===== BOT READY =====
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// ===== LOGIN USING ENV TOKEN =====
client.login(process.env.TOKEN);

// ===== HTTP SERVER FOR UPTIMEROBOT =====
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot is alive");
}).listen(process.env.PORT || 3000);
