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
} from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { addCategory, addSkill, deleteSkill, deleteCategory } from '../reducer';
import Accordion from 'react-native-collapsible/Accordion';

class SkillsScreen extends React.Component {
  state = {
    collapsed: true,
    activeSection: false,
    newCategoryName: '',
    newSkillName: '',
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSection = section => {
    this.setState({ activeSection: section });
  };

  renderHeader = (category, _, isActive) => {
    return (
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>{category.title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons name="keyboard-arrow-down" size={25} />
          <View style={styles.deleteButton}>
            <Button onPress={() => this.props.deleteCategory(category.id)} title="Usuń" />
          </View>
        </View>
      </View>
    );
  };

  renderContent = (category, _, isActive) => {
    if (!Array.isArray(category.skills)) {
      return;
    }

    return (
      <View style={styles.contentWrapper}>
        {category.skills.map((item, index) => (
          <View style={styles.skillInputWrapper} key={index}>
            <Text style={styles.contentText}>{item}</Text>
            <EntypoIcons
              name="cross"
              size={20}
              style={{ marginRight: 15, marginBottom: 10, color: '#e91e63' }}
              onPress={() => {
                this.props.deleteSkill(category.id, index);
              }}
            />
          </View>
        ))}
        <View style={styles.skillInputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={value => this.setState({ newSkillName: value })}
            value={this.state.newSkillName}
            multiline={true}
            placeholder="Dodaj nową kategorię..."
          />
          {/* <View style={styles.buttonWrapper}> */}
          <MaterialIcons
            name="add"
            size={25}
            style={{ marginRight: 15, marginBottom: 10 }}
            onPress={() => {
              this.props.addSkill(this.state.newSkillName, category.id);
              this.setState({ newSkillName: '' });
            }}
          />
          {/* </View> */}
        </View>
      </View>
    );
  };

  render() {
    const { skillsCategories, addCategory } = this.props;
    const { newCategoryName } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={value => this.setState({ newCategoryName: value })}
            value={newCategoryName}
            multiline={true}
            placeholder="Dodaj nową kategorię..."
          />
          <View>
            <Button
              onPress={() => {
                addCategory(newCategoryName);
                this.setState({ newCategoryName: '' });
              }}
              title="Dodaj"
            />
          </View>
        </View>
        {console.log(this.props.skillsCategories)}
        <ScrollView>
          <Accordion
            activeSection={this.state.activeSection}
            sections={skillsCategories}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSection}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  skillsCategories: state.skillsCategories,
});

const mapDispatchToProps = {
  addCategory,
  addSkill,
  deleteSkill,
  deleteCategory,
};

const SkillsStack = createStackNavigator({
  MainView: {
    screen: connect(mapStateToProps, mapDispatchToProps)(SkillsScreen),
    navigationOptions: ({ navigation }) => ({
      title: 'Lista umiejętności',
      headerLeft: (
        <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />
      ),
    }),
  },
});

SkillsStack.navigationOptions = {
  drawerLabel: 'Lista umiejętności',
  drawerIcon: ({ tintColor }) => <MaterialIcons name="list" size={24} style={{ color: tintColor }} />,
};

export default SkillsStack;

const viewWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 30,
  },
  headerWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgb(240, 240, 240)',
    paddingLeft: 30,
    paddingRight: 30,
  },
  contentText: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  inputWrapper: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  skillInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  input: {
    fontWeight: '500',
    width: 200,
    padding: 10,
  },
  deleteButton: {
    marginBottom: 10,
  },
});
