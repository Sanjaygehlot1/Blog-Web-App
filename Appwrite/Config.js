import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../src/conf/conf";
export class Configuration {
    client = new Client()
    database
    storage
    constructor() {
        this.client.setEndpoint('https://cloud.appwrite.io/v1')
            .setProject("project-id")

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    CreatePost = async ({ Title, Content, Slug, Status, FeaturedImage, UserID }) => {
        try {

            return await this.database.createDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                Slug,
                {
                    Title,
                    Content,
                    Status,
                    FeaturedImage,
                    UserID

                }
            )
        } catch (error) {
            console.log("Error in CreatePost::", error.message)

        }
    }

    UpdatePost = async ({ Title, Content, Slug, Status, FeaturedImage, UserID }) => {
        try {
            return await this.database.updateDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                Slug,
                {
                    Title,
                    Content,
                    FeaturedImage,
                    Status,
                    UserID
                }
            )
        } catch (error) {
            console.log("Error in UpdatePost::", error.message)
        }
    }

    DeletePost = async (Slug) => {
        try {
            return await this.database.deleteDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                Slug

            )
        } catch (error) {
            console.log("Error in DeletePost::", error.message)

        }
    }



    GetActivePost = async () => {
        try {
            return await this.database.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                [Query.equal("Status", "Active")]
            )
        } catch (error) {
            console.log("Error in GetActivePosts::", error.message)

        }
    }
    GetAllPosts = async () => {
        try {
            return await this.database.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,

            )
        } catch (error) {
            console.log("Error in GetAllPosts::", error.message)

        }
    }


    GetAPost = async (Slug) => {
        try {
            return await this.database.getDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                Slug
            )
        } catch (error) {
            console.log("Error in GetAPost::", error.message)

        }
    }

    UploadImage = async (File) => {
        try {
            return await this.storage.createFile(
                conf.BUCKET_ID,
                ID.unique(),
                File

            )
        } catch (error) {
            console.log("Error in UploadImage::", error.message)

        }
    }

    UpdateImage = async (FileID) => {
        try {
            return await this.storage.updateFile(
                conf.BUCKET_ID,
                FileID

            )
        } catch (error) {
            console.log("Error in UpdateImage::", error.message)

        }
    }

    DeleteImage = async (FileID) => {
        try {
            return await this.storage.deleteFile(
                conf.BUCKET_ID,
                FileID
            )
        } catch (error) {
            console.log("Error in DeleteFIle::", error.message)

        }
    }

    GetImagePreview = (FileID) => {
        try {
            return this.storage.getFilePreview(
                conf.BUCKET_ID,
                FileID
            )
        } catch (error) {
            console.log("Error in GetImagePreview::", error.message)
        }
    }

    DownloadImage =  (FileID) => {
        try {
            const downloadURL =  this.storage.getFileDownload(conf.BUCKET_ID, FileID);
            const anchor = document.createElement('a');
            anchor.href = downloadURL;
            anchor.download = 'image.jpg';
            anchor.click();
        } catch (error) {
            console.error("Error in DownloadImage:", error.message);
        }
    };





}

const config = new Configuration()
export default config
