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
import BackgroundTask from 'react-native-background-task';
import { Stopwatch } from 'react-native-stopwatch-timer';
import TimerList from './TimerList';
import { addTimerRecord, deleteTimerRecord } from '../store/actions';
import moment from 'moment';

class TimerScreen extends React.Component {
  state = {
    categoryName: '',
    categorySkills: [],
    skillName: '',

    time: '00:00:00',
    totalDuration: 90000,
    stopwatchStart: false,
    stopwatchReset: false,
    isSaved: false,

    startTime: '',
  };

  componentDidMount() {
    this.setState({
      categoryName: this.props.skillsCategories[0].title,
      categorySkills: this.props.skillsCategories[0].skills,
      skillName: this.props.skillsCategories[0].skills[0],
    });
  }

  handlePickerChange = categoryName => {
    const { skillsCategories } = this.props;
    const category = skillsCategories.filter(category => category.title === categoryName);
    this.setState({ categoryName: categoryName, categorySkills: category[0].skills });
  };

  componentWillUnmount() {
    console.log('unmount');
  }

  toggleStopwatch = () => {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
      startTime: moment().format('HH:mm:ss'),
    });
  };

  resetStopwatch = () => {
    this.setState({ stopwatchStart: false, stopwatchReset: true, isSaved: false, startTime: '' });
  };

  getFormattedTime = time => {
    this.duration = time;
  };

  saveTime = () => {
    const { categoryName, skillName, startTime } = this.state;
    if (!this.state.stopwatchStart) {
      this.setState({ isSaved: true });
    }

    this.props.addTimerRecord(
      categoryName,
      skillName,
      moment.duration(this.duration).asSeconds(),
      startTime,
      this.duration
    );
  };

  renderSaveButton = () => {
    if (this.state.isSaved) {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 40,
          }}
        >
          <Text style={{ fontSize: 20, color: 'rgb(28, 184, 28)' }}>ZAPISANO</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 40,
          }}
          onPress={this.saveTime}
        >
          <Text style={{ fontSize: 20 }}>ZAPISZ</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.info}>Włącz timer aby rejestrować czas poświęcony na rozwój danej umiejętności</Text>
        </View>
        <Text style={styles.label}>Wybierz kategorię</Text>
        {/* {console.log('timer records ', this.props.timerRecords)} */}
        <Picker selectedValue={this.state.categoryName} onValueChange={itemValue => this.handlePickerChange(itemValue)}>
          {this.props.skillsCategories.map(category => (
            <Picker.Item label={category.title} value={category.title} key={category.id} />
          ))}
        </Picker>
        <View>
          <Text style={styles.label}>Wybierz umiejętność</Text>
          <Picker
            selectedValue={this.state.skillName}
            onValueChange={itemValue => this.setState({ skillName: itemValue })}
          >
            {this.state.categorySkills.map((skill, index) => <Picker.Item label={skill} value={skill} key={index} />)}
          </Picker>
        </View>
        {/* )} */}
        {/* <Text>{this.state.time}</Text> */}
        <Stopwatch
          laps
          start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime}
        />
        <View style={styles.stopwatchButtonsWrapper}>
          <TouchableOpacity onPress={this.toggleStopwatch}>
            <Text style={{ fontSize: 20 }}>{!this.state.stopwatchStart ? 'START' : 'STOP'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.resetStopwatch}>
            <Text style={{ fontSize: 20 }}>RESET</Text>
          </TouchableOpacity>
        </View>
        {this.state.isSaved}
        {this.renderSaveButton()}
      </View>
    );
  }
}

const options = {
  container: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    width: 220,
    alignSelf: 'center',
  },
  text: {
    fontSize: 30,
    color: '#000',
    marginLeft: 7,
    alignSelf: 'center',
  },
};

const mapStateToProps = state => ({
  skillsCategories: state.skillsCategories,
  timerRecords: state.timerRecords,
});

const mapDispatchToProps = { addTimerRecord, deleteTimerRecord };

const TimerStack = createStackNavigator({
  MainView: {
    screen: createMaterialTopTabNavigator(
      {
        Timer: {
          screen: connect(mapStateToProps, mapDispatchToProps)(TimerScreen),
        },
        Lista: {
          screen: connect(mapStateToProps, mapDispatchToProps)(TimerList),
        },
      },
      {
        tabBarOptions: {
          labelStyle: {
            color: '#64b5f6',
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: '#fff',
          },
        },
      }
    ),
    navigationOptions: ({ navigation }) => ({
      title: 'Timer',
      headerLeft: (
        <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />
      ),
    }),
  },
});

TimerStack.navigationOptions = {
  drawerLabel: 'Timer',
  drawerIcon: ({ tintColor }) => <MaterialIcons name="timer" size={24} style={{ color: tintColor }} />,
};

export default TimerStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64b5f6',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stopwatchButtonsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 200,
    justifyContent: 'space-around',
  },
});
