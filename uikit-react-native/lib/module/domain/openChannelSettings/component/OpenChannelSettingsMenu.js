import React, { useContext } from 'react';
import { View } from 'react-native';
import { useChannelHandler } from '@sendbird/uikit-chat-hooks';
import { Icon, MenuBar, useAlert, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { isDifferentChannel, useForceUpdate, useUniqHandlerId } from '@sendbird/uikit-utils';
import { UNKNOWN_USER_ID } from '../../../constants';
import { useLocalization, useSendbirdChat } from '../../../hooks/useContext';
import { OpenChannelSettingsContexts } from '../module/moduleContext';
const OpenChannelSettingsMenu = _ref => {
  let {
    onPressMenuModeration,
    onPressMenuParticipants,
    onPressMenuDeleteChannel,
    menuItemsCreator = menu => menu
  } = _ref;
  const {
    currentUser,
    sdk
  } = useSendbirdChat();
  const {
    channel
  } = useContext(OpenChannelSettingsContexts.Fragment);
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const {
    alert
  } = useAlert();
  const forceUpdate = useForceUpdate();
  const handlerId = useUniqHandlerId('OpenChannelSettingsMenu');
  const onChannelUpdated = eventChannel => {
    if (isDifferentChannel(channel, eventChannel)) return;
    forceUpdate();
  };
  useChannelHandler(sdk, handlerId, {
    onChannelChanged: onChannelUpdated,
    onChannelParticipantCountChanged: onChannelUpdated
  }, 'open');
  const menuItems = menuItemsCreator([{
    icon: 'moderation',
    visible: channel.isOperator((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? UNKNOWN_USER_ID),
    name: STRINGS.OPEN_CHANNEL_SETTINGS.MENU_MODERATION,
    onPress: () => onPressMenuModeration(),
    actionItem: /*#__PURE__*/React.createElement(Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'members',
    name: STRINGS.OPEN_CHANNEL_SETTINGS.MENU_PARTICIPANTS,
    onPress: () => onPressMenuParticipants(),
    actionLabel: String(channel.participantCount),
    actionItem: /*#__PURE__*/React.createElement(Icon, {
      icon: 'chevron-right',
      color: colors.onBackground01
    })
  }, {
    icon: 'leave',
    iconColor: colors.error,
    name: STRINGS.OPEN_CHANNEL_SETTINGS.MENU_DELETE_CHANNEL,
    onPress: () => {
      alert({
        title: STRINGS.OPEN_CHANNEL_SETTINGS.DIALOG_CHANNEL_DELETE_CONFIRM_TITLE,
        buttons: [{
          text: STRINGS.OPEN_CHANNEL_SETTINGS.DIALOG_CHANNEL_DELETE_CONFIRM_CANCEL
        }, {
          text: STRINGS.OPEN_CHANNEL_SETTINGS.DIALOG_CHANNEL_DELETE_CONFIRM_OK,
          style: 'destructive',
          onPress: () => {
            channel.delete().then(() => onPressMenuDeleteChannel());
          }
        }]
      });
    }
  }]);
  return /*#__PURE__*/React.createElement(View, null, menuItems.map(menu => {
    return /*#__PURE__*/React.createElement(MenuBar, {
      key: menu.name,
      onPress: menu.onPress,
      name: menu.name,
      disabled: menu.disabled,
      visible: menu.visible,
      icon: menu.icon,
      iconColor: menu.iconColor,
      iconBackgroundColor: menu.iconBackgroundColor,
      actionLabel: menu.actionLabel,
      actionItem: menu.actionItem
    });
  }));
};
export default OpenChannelSettingsMenu;
//# sourceMappingURL=OpenChannelSettingsMenu.js.map