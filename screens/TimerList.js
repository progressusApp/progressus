import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from 'react-redux';
import { deleteTimerRecord } from '../store/actions';

class TimerList extends React.Component {
  state = {
    collapsed: true,
    activeSection: false,
  };

  setSection = section => {
    this.setState({ activeSection: section });
  };

  renderHeader = (record, _, isActive) => {
    return (
      <View style={styles.headerWrapper}>
        <View>
          <Text style={styles.headerTextCategory}>{record.categoryName}</Text>
          <Text style={styles.headerText}>{record.skillName}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name="keyboard-arrow-down" size={25} />
        </View>
      </View>
    );
  };

  renderContent = (record, _, isActive) => {
    return (
      <View style={styles.contentWrapper}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10, width: 80 }}>Czas trwania</Text>
            <Text>{record.duration}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10, width: 80 }} />
            <Text>
              {record.startTime} - {record.endTime}
            </Text>
          </View>
        </View>
        <View>
          <EntypoIcons
            name="cross"
            size={20}
            style={{ marginRight: 15, marginBottom: 10, color: '#e91e63' }}
            onPress={() => {
              this.props.deleteTimerRecord(record.id);
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const { timerRecords } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Accordion
            activeSection={this.state.activeSection}
            sections={timerRecords}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSection}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  timerRecords: state.timerRecords,
});

const mapDispatchToProps = { deleteTimerRecord };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerText: {
    fontSize: 13,
  },
  headerTextCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64b5f6',
  },
  contentWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgb(240, 240, 240)',
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
