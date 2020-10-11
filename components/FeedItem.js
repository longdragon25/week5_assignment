import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      item: { title, urlToImage, source, content, publishedAt, url}
    } = this.props;
    return (
      <View style={styles.containerFlex} >
        <Card title={title} image={{uri: urlToImage}}>
          <View style={styles.row}>
            <Text style={styles.label}>Source</Text>
            <Text style={styles.info}>{source.name}</Text>
          </View>
          <Text>{content}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Published</Text>
            <Text style={styles.info}>
              {moment(publishedAt).format('LLL')}
            </Text>
          </View>
          <Button onPress={ ()=>{ Linking.openURL(url)}} icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
});


export default FeedItem;