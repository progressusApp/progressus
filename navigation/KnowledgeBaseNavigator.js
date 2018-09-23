import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import KnowledgeBaseView from '../screens/knowledgeBase/KnowledgeBase';
import NotesView from '../screens/knowledgeBase/NotesView';
import NewNote from '../screens/knowledgeBase/NewNote';
import TextNoteView from '../screens/knowledgeBase/TextNote';
import GraphicNoteView from '../screens/knowledgeBase/GraphicNote';

const KnowledgeBaseStack = createStackNavigator({
  MainView: {
    screen: KnowledgeBaseView,
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
    screen: NotesView,
    navigationOptions: ({ navigation }) => ({
      title: 'Notatki',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  NewNote: {
    screen: NewNote,
    navigationOptions: ({ navigation }) => ({
      title: 'Nowa notatka',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  TextNote: {
    screen: TextNoteView,
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka tekstowa',
      headerLeft: (
        <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
      ),
    }),
  },
  GraphicNote: {
    screen: GraphicNoteView,
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
