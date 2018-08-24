import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import NewTaskView from './NewTask';

// const ToDoListScreen = ({ navigation }) => (
//   <View style={styles.container}>
//     <Text>Dzień dobry, tu będzie to do lista</Text>
//     <FlatList
//       ref={this.setRef}
//       style={{ padding: 10, flex: 1 }}
//       data={this.getItems()}
//       renderItem={this.renderItem}
//       keyExtractor={this.keyExtractor}
//     />
//   </View>
// );

class ToDoListScreen extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        content: 'content',
        date: 'date',
        done: false,
      },
      {
        id: 2,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
      {
        id: 3,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
      {
        id: 4,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
      {
        id: 5,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
      {
        id: 6,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
      {
        id: 7,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
      {
        id: 8,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
      {
        id: 9,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
      {
        id: 11,
        content: 'content 2',
        date: 'date 2',
        done: true,
      },
    ],
  };

  updateTaskState = taskID => {
    this.setState({
      tasks: this.state.tasks.map(task => (task.id === taskID ? { ...task, done: !task.done } : task)),
    });
  };

  renderItem = ({ item }) => {
    return (
      // <View style={styles.task}>
      // <Text>{item.done.toString()}</Text>
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
      // {/* <CheckBox value={item.done} onChange={() => this.updateTaskState(item.key)} /> */}
      // {/* <CheckBox label="Label" checked={true} onChange={checked => console.log('I am checked', checked)} /> */}
      // <Text style={styles.taskContent}>{item.content}</Text>
      // <Text>{item.date}</Text>
      // </View>
    );
  };

  keyExtractor = item => item.id.toString();
  setRef = el => (this.list = el);

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            ref={this.setRef}
            style={{ padding: 10, flex: 1 }}
            data={this.state.tasks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </ScrollView>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewTaskView')} style={styles.newTaskButton}>
          <MaterialIcons name="add" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

const ToDoListStack = createStackNavigator({
  MainView: {
    screen: ToDoListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Lista "to do"',
      headerLeft: (
        <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />
      ),
    }),
  },
  NewTaskView: {
    screen: NewTaskView,
    navigationOptions: ({ navigation }) => ({
      title: 'Nowe zadanie',
      headerLeft: (
        <MaterialIcons
          name="arrow-back"
          size={30}
          style={{ marginLeft: 15 }}
          onPress={() => navigation.navigate('MainView')}
        />
      ),
    }),
  },
});

ToDoListStack.navigationOptions = {
  drawerLabel: 'Lista "to do"',
  drawerIcon: ({ tintColor }) => <Icon name="check-square" size={24} style={{ color: tintColor }} />,
};

export default ToDoListStack;

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
    borderBottomWidth: 1,
  },
  taskContent: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskLabel: {
    marginLeft: 10,
  },
  newTaskButton: {
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
