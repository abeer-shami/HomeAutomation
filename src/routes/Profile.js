import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image

    
} from 'react-native';
import { Icon} from 'react-native-elements'; 

export default class Profile extends React.Component {
       static navigationOptions={
        header: null,    
        tabBarLabel:'Profile',
        tabBarIcon:()=> {
            return <Icon name="people" size={25} color={"white"}/>
        }
    }
    constructor(props) {
        super(props)
       this.state={
       	init:this.getCureentUser(),
       	name:"",
        logout : ""
       
       }
    }
        //logout
        async logout() {
            try {
                     let response = await fetch('http://192.168.8.103:8000/logout');
                     let responseJson = await response.json();
                     this.setState({logout:responseJson})
                     return this.props.changeV('Login');
               } catch(error) {
                 console.error(error);
                 }
        } 
        //get current user
        async getCureentUser() {
            try {
                     let response = await fetch('http://192.168.8.103:8000/user');
                     let responseJson = await response.json();
                     this.setState({name:responseJson})
               } catch(error) {
                 console.error(error);
                 }
        } 



    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('./Smart.png')}
                    />
                    </View>
                    <Text style={styles.header}>
                    {' '}
                 	{this.state.name}
                        </Text>
                
               
                <View style={styles.buttonContainer} >
                            
                <TouchableOpacity
                style={styles.buttonContainer}
                    onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>Log out</Text>
                    </TouchableOpacity> 

                </View>

                </KeyboardAvoidingView>

            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    logo: {
        width: 200,
        height: 200
    },
    header: {
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
        opacity: 0.8,
        fontWeight: '700'
    },
    buttonContainer: {
        margin:10,
        borderRadius: 10,    
        backgroundColor: '#87CEFA',
        padding:10
    }
});
