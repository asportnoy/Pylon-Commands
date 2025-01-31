import { config } from '../config';

config.commands.on(
  {
    name: 'setnick',
    description: "Changes a member's Nickname",
    filters: discord.command.filters.canManageNicknames()
  },
  (args) => ({
    member: args.guildMember(),
    input: args.string()
  }),
  async (message, { member, input }) => {
    try {
      await member.edit({
        nick: input
      });
      await message.reply(
        `${member.user.getTag()}'s nickname has been set to ${input}`
      );
    } catch (err) {
      await message.reply(`My permissions are not enough.`);
    }
  }
);
