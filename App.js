import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import FeedItem from './components/FeedItem'
import moment from 'moment';
import { Card, Button } from 'react-native-elements';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      loading: false,
      listArticles: [],
      totalResults: 0,
      page: 1,
      loadMore: false,
    }
  }
  componentDidMount = async () => {
    const { page } = this.state;
    this.setState({ loading: true });
    await this.callApi(page);
  }

  callApi = async (page) => {
    const { listArticles } = this.state;
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=8c63f6369ad3460597002ef2c0d13f08&page=${page}');
    const jsonData = await response.json();
    this.setState({
      page: page,
      loading: false,
      refreshing: false,
      listArticles: listArticles.concat(jsonData.articles),
      totalResults: response.totalResults
    });
  }

  onEndReached = async () => {
    const { page } = this.state;
    const newPage = page + 1;
    this.callApi(newPage);
    
  }

  onRefresh = async () => {
    const newPage = 1;
    await this.setState({refreshing: true , listArticles: [], page: newPage,});
    setTimeout(() => {
      this.callApi(newPage);
    }, 1000);
  }

  renderFooter = () => {
    if(!this.state.refreshing) {
      return <ActivityIndicator size="large" color="purple" animating={this.state.loading} />
    }
  }

  renderItem = ({ item }) => {
    return <FeedItem item={item} />
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="purple" animating={this.state.loading} />
        </View>
      );
    }
    return (
      <View style={styles.containerFlex}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{this.state.listArticles.length}</Text>
        </View>
        <FlatList
          data={this.state.listArticles}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter()}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
        />
      </View>
    )
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