/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ActivityIndicatorIOS,
  StyleSheet,
  Image,
  ListView,
  PixelRatio,
  Text,
  TouchableHighlight,
  View,
} = React;

var UserList = React.createClass({
  getInitialState: function() {
    return {
      usersLoaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    };
  },
  
  componentDidMount: function () {
    // preload user list
    this.fetchExistentUsers();
  },

  fetchExistentUsers: function (uid, returnUser) {
    var requestUri = this.props.firebaseRef + "users.json";

    fetch(requestUri)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            usersLoaded: true
          });
        }
      })
      .done();
  },

  onPress: function (user) {
    // navigate to user
    console.log(user.username + " row clicked!");
  },

  renderRow: function (user) {
    return (
        <TouchableHighlight onPress={this.onPress} underlayColor="#fff">
        <View>
          <View style={styles.rowItem}>
            <View>
              <Image style={styles.thumb} source={{uri: user.profileImageUrl}} />
            </View>
            <View style={styles.text}>
              <Text> {user.displayName}</Text>
              <Text> @{user.username}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
        </TouchableHighlight>
    );
  },

  render: function () {
    if (this.state.usersLoaded) {
      return(
        <View style={{flex: 1}}>
          <ListView 
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            contentContainerStyle={[styles.listContainer]}/>
        </View>
      );
    } else {
      return(
        <View style={styles.centering}>
          <ActivityIndicatorIOS
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
      );
    }
  }
});

var styles = StyleSheet.create({
  centering: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    alignItems: 'stretch',
    justifyContent:'flex-start',
    padding: 0
  },
  rowItem: {
    padding: 10,
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  text: {
    marginTop: 15,
    marginLeft: 15
  },
  thumb: {
    height: 50,
    width: 50,
    borderRadius: 50 / PixelRatio.get(),
    marginTop: 15,
    borderColor: "#a4aba8",
    borderWidth: 2
  }
});

module.exports = UserList;
