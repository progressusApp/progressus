import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import NotesView from './NotesView';
import NewNote from './NewNote';
import TextNote from './TextNote';
import AudioNote from './AudioNote';
import GraphicNote from './GraphicNote';
// import _ from 'lodash';
import { addNote, deleteNote } from '../../store/actions';
import NotePreview from './NotePreview';

class KnowledgeBaseScreen extends React.Component {
  render() {
    // const existingCategoriesIDs = _.uniq(this.props.notes.map(note => note.categoryID));

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.categoriesWrapper}>
            {this.props.skillsCategories.map((category, key) => {
              // if (!existingCategoriesIDs.includes(category.id)) {
              //   return null;
              // }
              return (
                <TouchableOpacity
                  key={key}
                  style={styles.category}
                  onPress={() =>
                    this.props.navigation.navigate('NotesView', {
                      categoryID: category.id,
                      categoryName: category.title,
                    })
                  }
                >
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // notes: state.notes,
  skillsCategories: state.skillsCategories,
});

const mapDispatchToProps = { addNote, deleteNote };

const KnowledgeBaseStack = createStackNavigator({
  MainView: {
    screen: connect(
      mapStateToProps,
      mapDispatchToProps
    )(KnowledgeBaseScreen),
    navigationOptions: ({ navigation }) => ({
      title: 'Baza wiedzy',
      headerLeft: (
        <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />
      ),
      headerRight: (
        <MaterialIcons
          name="add"
          size={30}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('NewNote')}
        />
      ),
    }),
  },
  NotesView: {
    screen: connect(
      mapStateToProps,
      mapDispatchToProps
    )(NotesView),
    navigationOptions: ({ navigation }) => ({
      title: 'Notatki',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  NewNote: {
    screen: connect(
      mapStateToProps,
      mapDispatchToProps
    )(NewNote),
    navigationOptions: ({ navigation }) => ({
      title: 'Nowa notatka',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  TextNote: {
    screen: connect(
      mapStateToProps,
      mapDispatchToProps
    )(TextNote),
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka tekstowa',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  AudioNote: {
    screen: connect(
      mapStateToProps,
      mapDispatchToProps
    )(AudioNote),
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka głosowa',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  GraphicNote: {
    screen: connect(
      mapStateToProps,
      mapDispatchToProps
    )(GraphicNote),
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka graficzna',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  NotePreview: {
    screen: NotePreview,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Podgląd notatki',
        headerLeft: (
          <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
        ),
      };
    },
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
});
