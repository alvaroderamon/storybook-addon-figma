var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import addons from '@storybook/addons';
import { ADDON_ID, PANEL_ID, EVENT_ID } from './shared';

export var FigmaPanel = function (_React$Component) {
  _inherits(FigmaPanel, _React$Component);

  function FigmaPanel() {
    var _ref;

    _classCallCheck(this, FigmaPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = FigmaPanel.__proto__ || Object.getPrototypeOf(FigmaPanel)).call.apply(_ref, [this].concat(args)));

    _this.state = Object.assign({}, FigmaPanel.initialState);
    _this.onAddFigma = _this.onAddFigma.bind(_this);
    return _this;
  }

  _createClass(FigmaPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          channel = _props.channel,
          api = _props.api;

      channel.on(EVENT_ID, this.onAddFigma);

      this.stopListeningOnStory = api.onStory(function () {
        _this2.onAddFigma(Object.assign({}, FigmaPanel.initialState));
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.stopListeningOnStory) {
        this.stopListeningOnStory();
      }

      this.unmounted = true;
      var channel = this.props.channel;

      channel.removeListener(EVENT_ID, this.onAddFigma);
    }
  }, {
    key: 'onAddFigma',
    value: function onAddFigma(_ref2) {
      var url = _ref2.url,
          _ref2$embedHost = _ref2.embedHost,
          embedHost = _ref2$embedHost === undefined ? FigmaPanel.initialState.embedHost : _ref2$embedHost,
          _ref2$allowFullScreen = _ref2.allowFullScreen,
          allowFullScreen = _ref2$allowFullScreen === undefined ? FigmaPanel.initialState.allowFullScreen : _ref2$allowFullScreen;

      this.setState({
        url: url,
        embedHost: embedHost,
        allowFullScreen: allowFullScreen
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          url = _state.url,
          allowFullScreen = _state.allowFullScreen,
          embedHost = _state.embedHost;
      var active = this.props.active;


      if (!active) {
        return null;
      }

      if (!url) {
        return React.createElement(
          'div',
          {
            style: {
              margin: '1rem',
              fontFamily: 'Arial',
              fontSize: '1rem',
              color: '#444',
              width: '100%',
              overflow: 'auto'
            }
          },
          React.createElement(
            'strong',
            null,
            'Oh Hey! \uD83D\uDC4B Add a Figma design to your story:'
          ),
          React.createElement(
            'pre',
            null,
            '\n          import React from \'react\'\n          import { storiesOf } from \'@storybook/react\'\n          import { WithFigma } from \'storybook-addon-figma\'\n\n          storiesOf(\'Button\', module)\n            .add(\'default\', () => (\n              <WithFigma\n                url={\'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File\'}\n              >\n                <button>Hello</button>\n              </WithFigma>\n            ))'
          )
        );
      }
      return React.createElement('iframe', {
        height: '100%',
        width: '100%',
        frameBorder: '0',
        src: 'https://www.figma.com/embed?embed_host=' + embedHost + '&url=' + url,
        allowFullScreen: allowFullScreen
      });
    }
  }]);

  return FigmaPanel;
}(React.Component);

FigmaPanel.initialState = {
  embedHost: 'storybook',
  url: null,
  allowFullScreen: true
};
FigmaPanel.propTypes = {
  channel: PropTypes.object,
  api: PropTypes.object
};
FigmaPanel.defaultProps = {
  channel: {},
  api: {}
};
addons.register(ADDON_ID, function (api) {
  addons.addPanel(PANEL_ID, {
    title: 'Figma',
    render: function render(_ref3) {
      var active = _ref3.active;
      return React.createElement(FigmaPanel, { channel: addons.getChannel(), api: api, active: active });
    }
  });
});