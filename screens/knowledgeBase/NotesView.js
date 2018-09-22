import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';

class NotesView extends React.Component {
  renderNotePreview = (content, contentType) => {
    if (contentType === 'text') {
      return <Text>{content.substring(0, 50)}...</Text>;
    } else if (contentType === 'graphic') {
      return <Image style={{ width: 50, height: 50 }} source={{ uri: content }} />;
    }
  };

  render() {
    const categoryID = this.props.navigation.getParam('categoryID');
    const categoryName = this.props.navigation.getParam('categoryName');
    console.log('notes', notes);
    const notes = this.props.notes.filter(note => note.categoryID === categoryID);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{categoryName}</Text>
        <ScrollView>
          <View style={styles.notesWrapper}>
            {notes.map(note => (
              <View style={styles.note} key={note.id}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('NotePreview', { note })}
                  style={{ flex: 0.9 }}
                >
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  {this.renderNotePreview(note.content, note.contentType)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.deleteNote(note.id)}>
                  <MaterialIcons name="delete" size={20} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const NotesViewStack = createStackNavigator({
  NotesView: {
    screen: NotesView,
    navigationOptions: ({ navigation }) => {
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
