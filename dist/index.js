import React from 'react';
import addons from '@storybook/addons';
import { EVENT_ID } from './shared';

export var WithFigma = function WithFigma(_ref) {
  var children = _ref.children,
      url = _ref.url,
      allowFullScreen = _ref.allowFullScreen,
      embedHost = _ref.embedHost;

  addons.getChannel().emit(EVENT_ID, {
    url: url,
    allowFullScreen: allowFullScreen,
    embedHost: embedHost
  });
  return children;
};

export default (function (_ref2) {
  var url = _ref2.url,
      allowFullScreen = _ref2.allowFullScreen,
      embedHost = _ref2.embedHost;
  return function (getStory) {
    addons.getChannel().emit(EVENT_ID, {
      url: url,
      allowFullScreen: allowFullScreen,
      embedHost: embedHost
    });
    return getStory();
  };
});

function checkA11y(storyFn, context) {
  var channel = addons.getChannel();
  return manager.wrapStory(channel, storyFn, context);
}