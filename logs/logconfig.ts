export const logConfig = {
  logChannels: {
    memberLogChannelID: '000000000000000000',
    joinLeaveLogChannelID: '000000000000000000',
    messageLogChannelID: '000000000000000000',
    serverLogChannelID: '000000000000000000'
  },
  memberLogToggle: {
    memberRoleUpdates: true,
    memberAvatarChange: true,
    memberNicknameChange: true,
    memberDiscriminatorChange: true,
    memberUsernameChange: true,
    memberBans: true,
    memberUnbans: true
  },
  joinLeaveLogToggle: {
    memberJoin: true,
    memberLeave: true
  },
  messageLogToggle: {
    messageDelete: true,
    messageEdit: true
  },
  serverLogToggle: {
    roleCreate: true,
    roleUpdate: true,
    roleDelete: true,
    channelCreate: true,
    channelUpdate: true,
    channelDelete: true,
    guildUpdate: true
  }
};
