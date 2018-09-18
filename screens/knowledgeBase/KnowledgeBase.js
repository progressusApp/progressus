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
import { Stopwatch } from 'react-native-stopwatch-timer';
import moment from 'moment';
import NotesView from './NotesView';
import NewNote from './NewNote';
import TextNote from './TextNote';
import AudioNote from './AudioNote';
import GraphicNote from './GraphicNote';
import _ from 'lodash';
import { addNote, deleteNote } from '../../store/actions';

class KnowledgeBaseScreen extends React.Component {
  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    const existingCategoriesIDs = _.uniq(this.props.notes.map(note => note.categoryID));

    return (
      <View style={styles.container}>
        <View style={styles.categoriesWrapper}>
          {console.log('accantus here notes ', this.props.notes)}
          {this.props.skillsCategories.map(category => {
            if (!existingCategoriesIDs.includes(category.id)) {
              return null;
            }
            return (
              <TouchableOpacity
                key={category.id}
                style={styles.category}
                onPress={() =>
                  this.props.navigation.navigate('NotesView', { categoryID: category.id, categoryName: category.title })
                }
              >
                <Text style={styles.categoryTitle}>{category.title}</Text>
                {/* <Text>Liczba notatek: {category.notes.length}</Text> */}
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewNote')} style={styles.newNoteButton}>
          <MaterialIcons name="add" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  skillsCategories: state.skillsCategories,
});

const mapDispatchToProps = { addNote, deleteNote };

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
  NewNote: {
    screen: connect(mapStateToProps, mapDispatchToProps)(NewNote),
    navigationOptions: ({ navigation }) => ({
      title: 'Nowa notatka',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  TextNote: {
    screen: connect(mapStateToProps, mapDispatchToProps)(TextNote),
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka tekstowa',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  AudioNote: {
    screen: connect(mapStateToProps, mapDispatchToProps)(AudioNote),
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka głosowa',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  GraphicNote: {
    screen: connect(mapStateToProps, mapDispatchToProps)(GraphicNote),
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka graficzna',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
});
//NewNote
KnowledgeBaseStack.navigationOptions = {
  drawerLabel: 'Baza wiedzy',
  drawerIcon: ({ tintColor }) => <EntypoIcons name="open-book" size={24} style={{ color: tintColor }} />,
};

export default KnowledgeBaseStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  newNoteButton: {
    backgroundColor: '#64b5f6',
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginBottom: 30,
  },
});
