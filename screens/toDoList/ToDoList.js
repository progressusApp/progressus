import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import NewTaskView from './NewTask';
import { connect } from 'react-redux';
import { addTask, updateTaskCheck } from '../../store/actions';

class ToDoListScreen extends React.Component {
  // state = {
  //   tasks: [],
  // };
  //
  // getTasks = () => {
  //   AsyncStorage.getItem('@toDoTasks').then(tasks => this.setState({ tasks: JSON.parse(tasks) }));
  // };

  // componentWillMount() {
  //   this.getTasks();
  // }

  updateTaskState = taskID => {
    // const tasks = this.state.tasks.map(task => (task.id === taskID ? { ...task, done: !task.done } : task));
    this.props.updateTaskCheck(taskID);
    // AsyncStorage.setItem('@toDoTasks', JSON.stringify(tasks)).then(this.getTasks);
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
    console.log('STATE ', this.props.state);
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
  state: state,
});

const mapDispatchToProps = {
  addTask,
  updateTaskCheck,
};

const ToDoListStack = createStackNavigator({
  MainView: {
    screen: connect(
      mapStateToProps,
      mapDispatchToProps
    )(ToDoListScreen),
    navigationOptions: ({ navigation }) => ({
      title: 'Lista "to do"',
      headerLeft: (
        <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('NewTaskView')}>
          <MaterialIcons name="add" size={30} style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
  NewTaskView: {
    screen: connect(
      mapStateToProps,
      mapDispatchToProps
    )(NewTaskView),
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
      // headerRight: (
      //   <MaterialIcons
      //     name="check"
      //     size={30}
      //     style={{ marginRight: 15 }}
      //     onPress={data => navigation.navigate('MainView')}
      //   />
      // ),
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
