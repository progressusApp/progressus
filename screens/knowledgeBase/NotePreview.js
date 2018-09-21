import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

class NotePreview extends React.Component {
  renderContent = (content, contentType) => {
    if (contentType === 'text') {
      return <Text>{content}</Text>;
    } else if (contentType === 'graphic') {
      return <Image style={styles.preview} source={{ uri: content }} />;
    }
  };

  render() {
    const note = this.props.navigation.getParam('note');
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{note.title}</Text>
        {this.renderContent(note.content, note.contentType)}
      </View>
    );
  }
}

export default NotePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    color: '#64b5f6',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
  },
});
