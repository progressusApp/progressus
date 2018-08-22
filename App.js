import React from 'react';
import { Button, ScrollView, StatusBar, Text, View } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { KeepAwake } from 'expo';

const SampleText = ({ children }) => <Text>{children}</Text>;

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SampleText>{banner}</SampleText>
      </View>
      <Button onPress={() => navigation.openDrawer()} title="Open drawer" />
      <Button onPress={() => navigation.toggleDrawer()} title="Toggle drawer" />
      <Button
        onPress={() => {
          navigation.openDrawer();
          setTimeout(() => {
            navigation.closeDrawer();
          }, 500);
        }}
        title="Open then close drawer shortly after"
      />
      <Button onPress={() => navigation.navigate('Email')} title="Open other screen" />
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
      <Button onPress={() => navigation.navigate('Home')} title="Go back to list" />
    </SafeAreaView>
    <StatusBar barStyle="default" />
    <KeepAwake />
  </ScrollView>
);

const InboxScreen = ({ navigation }) => <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />;
InboxScreen.navigationOptions = {
  headerTitle: 'Inbox',
};

const EmailScreen = ({ navigation }) => <MyNavScreen banner={'Email Screen'} navigation={navigation} />;

const DraftsScreen = ({ navigation }) => <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />;
DraftsScreen.navigationOptions = {
  headerTitle: 'Drafts',
};

const InboxStack = createStackNavigator({
  Inbox: { screen: InboxScreen },
  Email: { screen: EmailScreen },
});

InboxStack.navigationOptions = {
  drawerLabel: 'Inbox',
  drawerIcon: ({ tintColor }) => <MaterialIcons name="move-to-inbox" size={24} style={{ color: tintColor }} />,
};

const DraftsStack = createStackNavigator({
  Drafts: { screen: DraftsScreen },
  Email: { screen: EmailScreen },
});

DraftsStack.navigationOptions = {
  drawerLabel: 'Drafts',
  drawerIcon: ({ tintColor }) => <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />,
};

const DrawerExample = createDrawerNavigator(
  {
    Inbox: {
      path: '/',
      screen: InboxStack,
    },
    Drafts: {
      path: '/sent',
      screen: DraftsStack,
    },
  },
  {
    initialRouteName: 'Drafts',
    drawerWidth: 210,
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

DrawerExample.navigationOptions = {
  header: null,
};

export default DrawerExample;
