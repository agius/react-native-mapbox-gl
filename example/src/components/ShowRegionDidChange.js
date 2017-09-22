import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapboxGL from 'react-native-mapbox-gl';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import Page from './common/Page';
import Bubble from './common/Bubble';

import sheet from '../styles/sheet';
import colors from '../styles/colors';

import { DEFAULT_CENTER_COORDINATE } from '../utils';

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastClickBanner: {
    borderRadius: 30,
    position: 'absolute',
    bottom: 16,
    left: 48,
    right: 48,
    paddingVertical: 16,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

class ShowRegionDidChange extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor (props) {
    super(props);

    this.state = {
      regionFeature: undefined,
    };

    this.onRegionDidChange = this.onRegionDidChange.bind(this);
  }

  isValidCoordinate (geometry) {
    if (!geometry) {
      return false;
    }
    return geometry.coordinates[0] !== 0 && geometry.coordinates[1] !== 0;
  }

  onRegionDidChange (regionFeature) {
    this.setState({ regionFeature: regionFeature });
  }

  renderRegionChange () {
    let childView;

    if (!this.state.regionFeature || !this.isValidCoordinate(this.state.regionFeature.geometry)) {
      return (
        <Bubble>
          <Text>Move the map!</Text>
        </Bubble>
      );
    }

    const { geometry, properties } = this.state.regionFeature;
    return (
      <Bubble>
        <Text>Latitude: {geometry.coordinates[1]}</Text>
        <Text>Longitude: {geometry.coordinates[0]}</Text>
        <Text>Zoom Level: {properties.zoomLevel}</Text>
        <Text>Heading: {properties.heading}</Text>
        <Text>Pitch: {properties.pitch}</Text>
        <Text>Animated: {properties.animated ? 'true' : 'false'}</Text>
      </Bubble>
    );
  }

  render () {
    return (
      <Page {...this.props}>
        <MapboxGL.MapView
          centerCoordinate={DEFAULT_CENTER_COORDINATE}
          style={sheet.matchParent}
          onRegionDidChange={this.onRegionDidChange} />

        {this.renderRegionChange()}
      </Page>
    );
  }
}

export default ShowRegionDidChange;
