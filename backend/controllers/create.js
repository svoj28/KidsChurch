import { Client, Databases, ID } from "react-native-appwrite";
import { appwriteConfig } from '../../backend/db_appwrite';

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

const databases = new Databases(client);

export const createLessonDocument = async (data) => {
    try {
        const response = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.lessonsId,
            ID.unique(),
            data
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};