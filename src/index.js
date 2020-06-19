import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import {
  ResolveAuthScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  AddDoctor,
  AddChemist,
  Account,
  NearbyStores,
} from './screens';
import { theme } from './core/theme';

const TabStack = createBottomTabNavigator(
  {
    Dashboard: Dashboard,
    NearbyStores: NearbyStores,
  },
  {
    tabBarOptions: {
      inactiveTintColor: 'white',
      activeTintColor: theme.colors.bkg,
      style: {
        color: 'white',
        backgroundColor: theme.colors.primary,
      }
    },
  }
);

const AppStack = createDrawerNavigator(
  {
    // Dashboard: { screen: Dashboard, navigationOptions: { title: 'Home' } },
    Dashboard: { screen: TabStack, navigationOptions: { title: 'Home' } },
    AddDoctor: {
      screen: AddDoctor,
      navigationOptions: {
        title: 'Add Doctor',
        drawerLabel: 'Add Doctor',
        // drawerIcon: ({ tintColor }) => (
        //   <Ionicons name="md-home" style={{ color: tintColor }} />
        // ),
      },
    },
    AddChemist: {
      screen: AddChemist,
      navigationOptions: { title: 'Add Chemist', drawerLabel: 'Add Chemist' },
    },
    Account: {
      screen: Account,
      navigationOptions: { title: 'Account', drawerLabel: 'Account' },
    },
  },
  {
    headerMode: 'float',
    drawerBackgroundColor: theme.colors.primary,
    contentOptions: {
      itemStyle: {
        color: 'white',
      },
      inactiveTintColor: 'white',
      activeTintColor: theme.colors.bkg,
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    headerMode: 'none',
  }
);

const Router = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    Home: HomeScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    // initialRouteName: 'Home',
    // headerMode: 'none',
  }
);

export default createAppContainer(Router);
