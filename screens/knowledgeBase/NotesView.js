import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Picker,
  TouchableHighlight,
} from 'react-native';
import {
  createStackNavigator,
  SafeAreaView,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import BackgroundTask from 'react-native-background-task';
import { Stopwatch } from 'react-native-stopwatch-timer';
import moment from 'moment';

class NotesView extends React.Component {
  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    const category = this.props.navigation.getParam('notes');
    const { notes } = category;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{category.categoryName}</Text>
        <View style={styles.notesWrapper}>
          {notes.map(note => (
            <View style={styles.note} key={note.id}>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <MaterialIcons
                name="delete"
                size={20}
                onPress={() => {
                  console.log('feleted');
                }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   categoryNotes: state.categoryNotes,
// });

const mapDispatchToProps = {};

const NotesViewStack = createStackNavigator({
  NotesView: {
    screen: NotesView,
    navigationOptions: ({ navigation }) => {
      console.log('navigation ', navigation);
      return {
        title: 'Notatki',
        headerLeft: (
          <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
        ),
      };
    },
  },
});

NotesViewStack.navigationOptions = {
  drawerLabel: 'Baza wiedzy',
  drawerIcon: ({ tintColor }) => <EntypoIcons name="open-book" size={24} style={{ color: tintColor }} />,
};

export default NotesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
  },
  note: {
    height: 100,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: '#c1bcbc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64b5f6',
  },
  notesWrapper: {
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderColor: '#c1bcbc',
  },
  header: {
    fontSize: 22,
    color: '#64b5f6',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
  },
});
