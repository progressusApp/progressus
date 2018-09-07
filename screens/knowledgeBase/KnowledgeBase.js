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
import NotesView from './NotesView';

class KnowledgeBaseScreen extends React.Component {
  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Notatki</Text>
        <View style={styles.categoriesWrapper}>
          {this.props.categoryNotes.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.category}
              onPress={() => this.props.navigation.navigate('NotesView', { notes: category })}
            >
              <Text style={styles.categoryTitle}>{category.categoryName}</Text>
              <Text>Liczba notatek: {category.notes.length}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  categoryNotes: state.categoryNotes,
});

const mapDispatchToProps = {};

const KnowledgeBaseStack = createStackNavigator({
  MainView: {
    screen: connect(mapStateToProps, mapDispatchToProps)(KnowledgeBaseScreen),
    navigationOptions: ({ navigation }) => ({
      title: 'Baza wiedzy',
      headerLeft: (
        <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />
      ),
    }),
  },
  NotesView: {
    screen: connect(mapStateToProps, mapDispatchToProps)(NotesView),
    navigationOptions: ({ navigation }) => ({
      title: 'Notatki',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
});

KnowledgeBaseStack.navigationOptions = {
  drawerLabel: 'Baza wiedzy',
  drawerIcon: ({ tintColor }) => <EntypoIcons name="open-book" size={24} style={{ color: tintColor }} />,
};

export default KnowledgeBaseStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
  },
  category: {
    height: 70,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: '#c1bcbc',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64b5f6',
  },
  categoriesWrapper: {
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
