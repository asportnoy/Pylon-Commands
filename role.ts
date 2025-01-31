import { config } from '../config';

config.commands.subcommand(
  {
    filters: discord.command.filters.canManageRoles(),
    name: 'role',
    description: 'Edit and manage server roles'
  },
  (subcommand) => {
    subcommand.on(
      'create',
      (args) => ({
        newRoleName: args.string(),
        newRoleColor: args.text()
      }),
      async (message, { newRoleName, newRoleColor }) => {
        const newColor = parseInt(newRoleColor, 16);
        const guild = await message.getGuild();
        //  const existingRole = await guild.getRole(config.userrole.brightGreen);
        const existingRole = await guild.getRole('872614847001538590');
        const roleperms = await existingRole.permissions;
        await guild.createRole({
          color: newColor,
          name: newRoleName,
          hoist: false,
          mentionable: false,
          permissions: roleperms
        });
        await message.reply(
          new discord.Embed({
            title: 'Success!',
            color: newColor,
            description: `The role **${newRoleName}** has been created.\n**Color:** #${newColor}\n**Mentionable:** False\n**Hoisted:** False`
          })
        );
      }
    );

    subcommand.on(
      'add',
      //     &role add <member> <role>
      (args) => ({
        target: args.guildMember(),
        roleInput: args.string()
      }),
      async (message, { target, roleInput }) => {
        const guild = await message.getGuild();
        const role = await guild.getRole(roleInput);
        if (role == null) {
          message.reply(':warning: Invalid role id');
        } else {
          await target.addRole(role.id);
          message.reply(
            `Added **${role.name}** to **${target.user.getTag()}**.`
          );
        }
      }
    );

    subcommand.on(
      'remove',
      //     &role remove <member> <role>
      (args) => ({
        target: args.guildMember(),
        roleInput: args.string()
      }),
      async (message, { target, roleInput }) => {
        const guild = await message.getGuild();
        const role = await guild.getRole(roleInput);
        if (role == null) {
          message.reply(':warning: Invalid role id');
        } else {
          await target.removeRole(role.id);
          message.reply(
            `Removed **${role.name}** from **${target.user.getTag()}**.`
          );
        }
      }
    );

    subcommand.on(
      'color',
      (args) => ({
        roleInput: args.string(),
        newRoleColor: args.text()
      }),
      async (message, { roleInput, newRoleColor }) => {
        const newColor = parseInt(newRoleColor, 16);
        const guild = await message.getGuild();
        const role = await guild.getRole(roleInput);
        const oldColorHex = (role.color + Math.pow(16, 6))
          .toString(16)
          .slice(-6)
          .toLowerCase();
        if (role == null) {
          message.reply(':warning: Invalid role id');
        } else {
          role.edit({ color: newColor });
          await message.reply(
            new discord.Embed({
              title: 'Role Color Changed',
              color: newColor,
              description: `${role.toMention()} had its color changed from #${oldColorHex} to #${newRoleColor}`
            })
          );
        }
      }
    );

    subcommand.default(
      (args) => ({
        target: args.guildMember(),
        roleInput: args.string()
      }),
      async (message, { target, roleInput }) => {
        const guild = await message.getGuild();
        const role = await guild.getRole(roleInput);
        const roleCheck = target.roles.includes(role.id);
        console.log(target.roles);
        if (role == null) {
          message.reply(':warning: Invalid role id');
        } else {
          if (roleCheck === true) {
            await target.removeRole(role.id);
            message.reply(
              `Removed **${role.name}** from **${target.user.getTag()}**.`
            );
          } else {
            await target.addRole(role.id);
            message.reply(
              `Added **${role.name}** to **${target.user.getTag()}**.`
            );
          }
        }
      }
    );
  }
);
