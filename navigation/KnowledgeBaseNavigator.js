import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import KnowledgeBaseView from '../screens/knowledgeBase/KnowledgeBase';
import NotesView from '../screens/knowledgeBase/NotesView';
import NewNote from '../screens/knowledgeBase/NewNote';
import TextNoteView from '../screens/knowledgeBase/TextNote';
import GraphicNoteView from '../screens/knowledgeBase/GraphicNote';
import NotePreview from '../screens/knowledgeBase/NotePreview';

export const KnowledgeBaseStack = createStackNavigator({
  MainView: {
    screen: KnowledgeBaseView,
    navigationOptions: ({ navigation }) => ({
      title: 'Baza wiedzy',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('NewNote')}>
          <MaterialIcons name="add" size={30} style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
  NotesView: {
    screen: NotesView,
    navigationOptions: ({ navigation }) => ({
      title: 'Notatki',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
  NewNote: {
    screen: NewNote,
    navigationOptions: ({ navigation }) => ({
      title: 'Nowa notatka',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
  TextNote: {
    screen: TextNoteView,
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka tekstowa',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
  GraphicNote: {
    screen: GraphicNoteView,
    navigationOptions: ({ navigation }) => ({
      title: 'Notatka graficzna',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
  NotePreview: {
    screen: NotePreview,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Podgląd notatki',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        ),
      };
    },
  },
});

KnowledgeBaseStack.navigationOptions = {
  drawerLabel: 'Baza wiedzy',
  drawerIcon: ({ tintColor }) => <EntypoIcons name="open-book" size={24} style={{ color: tintColor }} />,
};
