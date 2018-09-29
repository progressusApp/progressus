import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Picker, Platform, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { addTimerRecord } from '../store/actions';
import moment from 'moment';

class TimerView extends React.Component {
  state = {
    categoryName: 'Kliknij by wybrać kategorię...',
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

  handlePickerChange = (itemName, itemValue) => {
    const { skillsCategories } = this.props;
    if (itemName === 'categoryName') {
      const category = skillsCategories.filter(category => category.title === itemValue);
      this.setState({ categoryName: itemValue, categorySkills: category[0].skills, skillName: category[0].skills[0] });
    } else {
      this.setState({ [itemName]: itemValue });
    }
  };

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

  openiOSPicker = (collection, itemName) => {
    let skillsOptions = collection.map(category => category.title);
    if (skillsOptions.includes(undefined)) {
      skillsOptions = collection;
    }
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...skillsOptions, 'Anuluj'],
        cancelButtonIndex: skillsOptions.length,
      },
      buttonIndex => {
        this.handlePickerChange(itemName, skillsOptions[buttonIndex]);
      }
    );
  };

  renderiOSPicker = (collection, itemName) => {
    return (
      <TouchableOpacity onPress={() => this.openiOSPicker(collection, itemName)} style={styles.categoryPickeriOS}>
        <Text>{this.state[itemName]}</Text>
      </TouchableOpacity>
    );
  };

  renderAndroidPicker = (collection, itemName) => {
    return (
      <Picker
        selectedValue={this.state[itemName]}
        onValueChange={itemValue => this.handlePickerChange(itemName, itemValue)}
      >
        {collection.map((item, index) => (
          <Picker.Item label={item.title || item} value={item.title || item} key={index} />
        ))}
      </Picker>
    );
  };

  renderNativePicker = (collection, itemName) => {
    if (Platform.OS === 'ios') {
      return this.renderiOSPicker(collection, itemName);
    } else if (Platform.OS === 'android') {
      return this.renderAndroidPicker(collection, itemName);
    }
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
        {this.renderNativePicker(this.props.skillsCategories, 'categoryName')}
        <View>
          <Text style={styles.label}>Wybierz umiejętność</Text>
          {this.renderNativePicker(this.state.categorySkills, 'skillName')}
        </View>
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
});

const mapDispatchToProps = { addTimerRecord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerView);

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
  categoryPickeriOS: {
    height: 30,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: '#c1bcbc',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
});
