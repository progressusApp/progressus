import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateTaskCheck } from '../../store/actions';

class ToDoListView extends React.Component {
  updateTaskState = taskID => {
    this.props.updateTaskCheck(taskID);
  };

  renderItem = ({ item }) => {
    return (
      <CheckBox
        checked={item.done}
        onPress={() => this.updateTaskState(item.id)}
        containerStyle={styles.task}
        title={
          <View style={styles.taskLabel}>
            <Text style={styles.taskContent}>{item.content}</Text>
            <Text>{item.date}</Text>
          </View>
        }
      />
    );
  };

  keyExtractor = (item, index) => index.toString();
  setRef = el => (this.list = el);

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            ref={this.setRef}
            style={{ padding: 10, flex: 1 }}
            data={this.props.tasks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.toDoTasks,
});

const mapDispatchToProps = {
  updateTaskCheck,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoListView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  task: {
    flex: 1,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
  },
  taskContent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskLabel: {
    marginLeft: 10,
  },
});
