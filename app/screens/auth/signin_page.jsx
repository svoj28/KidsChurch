import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInUser } from '../../../backend/controllers/auth';
import { useRouter } from "expo-router";

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const router = useRouter();

    const handleSignIn = async () => {
        if (!email || !password) {
          Alert.alert("Error", "Please enter both email and password.");
          return;
        }
    
        try {
          const session = await signInUser(email, password);
    
          // Redirect to dashboard
          router.push("screens/admin/home_admin");
        } catch (error) {
          console.error("Error during login:", error);
          Alert.alert("Login failed", error.message || "An error occurred during login.");
        }
      };
    

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>Sign In</Text>
            <TextInput
                style={{ height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8, borderRadius: 4 }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={{ height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8, borderRadius: 4 }}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={{ backgroundColor: '#007BFF', paddingVertical: 12, borderRadius: 4, alignItems: 'center' }} onPress={handleSignIn}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('screens/auth/signup_page')}>
                <Text style={{ marginTop: 16, color: '#007BFF', textAlign: 'center' }}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignInPage;
