import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { merge, get } from 'lodash';
import { Button, Slider, Switch, Icon } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import style from '../styles/player';
import getFileInDirection from '../lib/getFileInDirection';
import { cloudSaveOther } from '../actions/cloud';
import { settingsReplace } from '../actions/settings';
import { filesGetUrlAndPlay } from '../actions/files';

class Player extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const oldPath = get(prevState, 'path');
    const path = get(nextProps, 'settings.player.file.path');

    if (oldPath !== path) {
      return {
        played: 0,
        playedSeconds: 0,
        path,
      };
    }

    return null;
  }
  state = {
    path: undefined,
    played: 0,
    playedSeconds: 0,
    isFullScreen: true,
  };
  componentDidMount() {
    const { settings, filesGetUrlAndPlay } = this.props;
    const { path } = this.state;
    const source = get(settings, 'player.source');

    if (source && path) {
      filesGetUrlAndPlay({ source, path });
    }
  }
  goToFile(direction) {
    const { settings, files, filesGetUrlAndPlay } = this.props;
    const source = get(settings, 'player.source');
    const { path } = getFileInDirection(settings, files, direction);
    filesGetUrlAndPlay({ source, path });
  }
  render() {
    const { played, playedSeconds, path, isFullScreen } = this.state;
    const {
      settings,
      settingsReplace,
      settingsReplaceAndCloudSaveOther,
    } = this.props;
    const { player } = settings;
    const { volume, playing, muted, file = {}, loop } = player;
    const {
      url,
      album = 'Unknown Album',
      artist = 'Unknown Artist',
      name = 'Unknown Name',
      type,
    } = file;

    const config = {
      className: 'player',
      loop,
      muted,
      width: 'auto',
      height: 'auto',
      progressInterval: 1000,
      playsinline: !isFullScreen,
      controls: isFullScreen,
      volume,
      playing,
      url,
      ref: ref => {
        this.player = ref;
      },
      onDuration: () => this.player.seekTo(played),
      onProgress: ({ played, playedSeconds }) =>
        this.setState({ played, playedSeconds }),
      onEnded: () => this.goToFile('next'),
      onClick: () => this.setState({ isFullScreen: !isFullScreen }),
    };

    return (
      <div className={`root ${type} ${isFullScreen ? 'is-full-screen' : ''}`}>
        <style jsx>{style}</style>
        <ReactPlayer {...config} />
        <div className="main">
          <div className="directions">
            <Button
              disabled={!url}
              type="primary"
              shape="circle"
              icon="backward"
              onClick={() => this.goToFile('previous')}
            />
            <Button
              disabled={!url}
              type="primary"
              shape="circle"
              icon={playing ? 'pause' : 'caret-right'}
              onClick={() =>
                settingsReplaceAndCloudSaveOther(
                  merge({}, settings, {
                    player: { playing: !playing },
                  }),
                )
              }
            />
            <Button
              disabled={!url}
              type="primary"
              shape="circle"
              icon="forward"
              onClick={() => this.goToFile('next')}
            />
          </div>
          <div className="control sound">
            <Icon type="sound" />
            <Switch
              size="small"
              checked={!muted}
              onChange={() =>
                settingsReplaceAndCloudSaveOther(
                  merge({}, settings, {
                    player: { muted: !muted },
                  }),
                )
              }
            />
            <Slider
              value={volume}
              min={0}
              max={1}
              step={0.01}
              tipFormatter={volume => `Volume: ${Math.round(volume * 100)}%`}
              onChange={volume =>
                settingsReplace(
                  merge({}, settings, {
                    player: { volume },
                  }),
                )
              }
            />
          </div>
          <div className="control progress">
            <Icon type="retweet" />
            <Switch
              size="small"
              checked={loop}
              onChange={() =>
                settingsReplaceAndCloudSaveOther(
                  merge({}, settings, {
                    player: { loop: !loop },
                  }),
                )
              }
            />
            <Slider
              value={played}
              min={0}
              max={1}
              step={0.01}
              tipFormatter={() =>
                moment(
                  // eslint-disable-next-line no-underscore-dangle
                  moment.duration(playedSeconds, 'seconds')._data,
                ).format('mm:ss')
              }
              onChange={progress => this.player.seekTo(progress)}
            />
          </div>
          <div className="info">
            {path
              ? `${artist} - ${album} - ${name}`
              : 'Add credentials and play some media'}
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  files: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settingsReplaceAndCloudSaveOther: PropTypes.func.isRequired,
  filesGetUrlAndPlay: PropTypes.func.isRequired,
};

export default connect(
  ({ files, settings }) => ({ files, settings }),
  dispatch => ({
    settingsReplaceAndCloudSaveOther: payload => {
      dispatch(settingsReplace(payload));
      dispatch(cloudSaveOther());
    },
    settingsReplace: payload => dispatch(settingsReplace(payload)),
    filesGetUrlAndPlay: payload => dispatch(filesGetUrlAndPlay(payload)),
  }),
)(Player);