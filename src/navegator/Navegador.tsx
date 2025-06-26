import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screen/WelcomeScreen";
import LoginScreens from "../screen/LoginScreens";
import RegistroScreens from "../screen/RegistroScreens";

import ListaTareas from "../screen/ListaTareas";
import RegistroTareas from "../screen/RegistroScreens";
import TareaRegistro from "../screen/TareaRegistro";





const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

function MyStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome">
            <Stack.Screen name= 'Welcome' component={WelcomeScreen} />
            <Stack.Screen name = 'Login' component={LoginScreens}/>
            <Stack.Screen name = 'Registrer' component={RegistroScreens} />
            <Stack.Screen name = 'BotonTab' component={BottomTabNavigator} />
        </Stack.Navigator>

        
    )
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator >
        <Tab.Screen name="Hacertarea" component={TareaRegistro} />
        <Tab.Screen name="Vertareas" component={ListaTareas} />
       
      
      
    </Tab.Navigator>
  );    
}



export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}