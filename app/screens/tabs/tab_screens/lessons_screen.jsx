import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, Button, TouchableWithoutFeedback, Alert } from 'react-native';
import { getLessons } from '../../../../backend/controllers/read';
import { deleteLesson } from '../../../../backend/controllers/delete';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, LongPressGestureHandler, State } from 'react-native-gesture-handler';

const LessonsScreen = () => {
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const lessonsData = await getLessons();
                console.log('Fetched lessons:', lessonsData); 
                setLessons(lessonsData);
            } catch (error) {
                console.error('Error fetching lessons:', error); 
            }
        };

        fetchLessons();
    }, []);

    const handleLongPress = (item) => {
        setSelectedLesson(item);
        setDropdownVisible(item.$id);
    };

    const handleCloseDropdown = () => {
        setDropdownVisible(null);
    };

    const handleItemPress = (item) => {
        if (dropdownVisible) {
            handleCloseDropdown();
        } else {
            setSelectedLesson(item);
            setModalVisible(true);
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        try {
            await deleteLesson(lessonId);
            setLessons(lessons.filter(lesson => lesson.$id !== lessonId));
            Alert.alert('Success', 'Lesson deleted successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to delete lesson: ' + error.message);
        }
    };

    const confirmDeleteLesson = (lessonId) => {
        Alert.alert(
            'Delete Lesson',
            'Are you sure you want to delete this lesson?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => handleDeleteLesson(lessonId) },
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }) => {
        console.log('Lesson ID:', item.$id); // Debugging log
    
        return (
            <TouchableWithoutFeedback onPress={handleCloseDropdown}>
                <View>
                    <LongPressGestureHandler
                        onHandlerStateChange={({ nativeEvent }) => {
                            if (nativeEvent.state === State.ACTIVE) {
                                handleLongPress(item);
                            }
                        }}
                    >
                        <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                            <Text style={styles.title}>{item.topic_title}</Text>
                            {dropdownVisible === item.$id && (
                                <View style={styles.dropdownMenu}>
                                    <TouchableOpacity onPress={() => {
                                        handleCloseDropdown();
                                        console.log('Navigating with ID:', item.$id); // Debug log
                                        router.push({
                                            pathname: 'screens/tabs/tab_create/lesson_create',
                                            params: {
                                                lessonId: item.$id, 
                                                topic_title: item.topic_title,
                                                bible_verse: item.bible_verse,
                                                lesson: item.lesson,
                                            }
                                        });
                                    }}>
                                        <Text style={styles.dropdownItem}>Update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        handleCloseDropdown();
                                        confirmDeleteLesson(item.$id);
                                    }}>
                                        <Text style={styles.dropdownItem}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </TouchableOpacity>
                    </LongPressGestureHandler>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    

    const renderModalContent = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>{selectedLesson?.topic_title}</Text>
                        <Text>{selectedLesson?.bible_verse}</Text>
                        <Text>{selectedLesson?.lesson}</Text>
                    </ScrollView>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    data={lessons}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.$id}
                />
                {modalVisible && renderModalContent()}
                <TouchableOpacity style={styles.floatingButton} onPress={() => {
                    router.push('screens/tabs/tab_create/lesson_create');
                }}>
                    <Text style={styles.floatingButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
    },
    dropdownMenu: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    dropdownItem: {
        padding: 10,
        fontSize: 16,
        color: 'blue',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30,
        right: 30,
    },
    floatingButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default LessonsScreen;