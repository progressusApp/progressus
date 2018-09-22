import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
// import bubblesort from 'bubblesort';

class NotesView extends React.Component {
  state = {
    sorted: false,
  };

  renderNotePreview = (content, contentType) => {
    if (contentType === 'text') {
      return <Text>{content.substring(0, 50)}...</Text>;
    } else if (contentType === 'graphic') {
      return <Image style={{ width: 50, height: 50 }} source={{ uri: content }} />;
    }
  };

  compareTitle = (a, b) => {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  bubblesort = (arr, cmp) => {
    cmp = cmp || comparator;
    var temp;
    for (var i = 0, l = arr.length; i < l; i++) {
      for (var j = i; j > 0; j--) {
        if (cmp(arr[j], arr[j - 1]) < 0) {
          temp = arr[j];
          arr[j] = arr[j - 1];
          arr[j - 1] = temp;
        }
      }
    }
    return arr;
  };

  sortByTitle = notes => {
    return this.bubblesort(notes, this.compareTitle);
  };

  getCollectionToDisplay = notes => {
    if (this.state.sorted) {
      console.time('sortByTitle');
      const sortedValues = this.sortByTitle(notes);
      console.timeEnd('sortByTitle');
      return sortedValues;
    } else {
      return notes;
    }
  };

  render() {
    console.log('notes view');
    const categoryID = this.props.navigation.getParam('categoryID');
    const categoryName = this.props.navigation.getParam('categoryName');
    const notes = this.props.notes.filter(note => note.categoryID === categoryID);
    const listToDisplay = notes.slice(0, 200);
    this.getCollectionToDisplay(notes);
    console.log('listToDisplay ', listToDisplay[0]);
    console.log('listToDisplay ', listToDisplay.length);
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <Text style={styles.header}>{categoryName}</Text>
          <Button title="Sortuj po tytule" onPress={() => this.setState({ sorted: true })} />
        </View>
        <ScrollView>
          <View style={styles.notesWrapper}>
            {listToDisplay.map(note => (
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

    marginLeft: 20,
  },
});
