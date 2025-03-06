import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getLessonsById } from '../../../../backend/controllers/read';
import { createLessonDocument } from '../../../../backend/controllers/create';
import { updateDocument } from '../../../../backend/controllers/update';

const LessonCreate = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { lessonId } = route.params; // Get lesson ID from route params

    const [topic_title, setTopic_title] = useState('');
    const [bible_verse, setBible_verse] = useState('');
    const [lesson, setLesson] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const lesson = await getLessonsById(lessonId);
                setTopic_title(lesson.topic_title || '');
                setBible_verse(lesson.bible_verse || '');
                setLesson(lesson.lesson || '');
                setIsEditing(true);
            } catch (error) {
                alert('Error fetching lesson: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchLesson();
        } else {
            setLoading(false);
        }
    }, [lessonId]);

    const handleSaveChanges = async () => {
        const lessonData = {
            topic_title,
            bible_verse,
            lesson,
        };

        try {
            if (isEditing) {
                await updateDocument(lessonId, lessonData);
                alert('Lesson updated successfully!');
            } else {
                await createLessonDocument(lessonData);
                alert('Lesson created successfully!');
            }
            navigation.goBack(); // Redirect after update
        } catch (error) {
            alert('Error saving lesson: ' + error.message);
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'gray', padding: 5 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>
                {isEditing ? 'Edit Lesson' : 'Create Lesson'}
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={{ fontSize: 18, marginBottom: 1 }}>Topic Title</Text>
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 3, borderRadius: 5, marginBottom: 3 }}
                        placeholder="Enter topic title"
                        placeholderTextColor="darkgray"
                        value={topic_title}
                        onChangeText={setTopic_title}
                    />

                    <Text style={{ fontSize: 18, marginBottom: 1 }}>Bible Verse</Text>
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 3, borderRadius: 5, marginBottom: 3 }}
                        placeholder="Enter bible verse"
                        placeholderTextColor="darkgray"
                        value={bible_verse}
                        onChangeText={setBible_verse}
                    />

                    <Text style={{ fontSize: 18, marginBottom: 1 }}>Long Description</Text>
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 3, borderRadius: 5, marginBottom: 3 }}
                        placeholder="Enter lesson description"
                        placeholderTextColor="darkgray"
                        value={lesson}
                        onChangeText={setLesson}
                        multiline
                    />

                    <TouchableOpacity onPress={handleSaveChanges} style={{ backgroundColor: 'blue', padding: 4, borderRadius: 5, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{isEditing ? 'Save Changes' : 'Create Lesson'}</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
};

export default LessonCreate;