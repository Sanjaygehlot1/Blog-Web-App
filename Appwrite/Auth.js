import { Client, Account, ID } from "appwrite";
import conf from "../src/conf/conf";


export class AuthServices {

    client = new Client()
    Account

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject("project-id")

        this.Account = new Account(this.client)
        console.log(conf)
    }

    async CreateAccount({ email, password, name }) {
        try {
            const account = await this.Account.create(ID.unique(), email, password)

            if (account) {
                if (name) {
                    this.Account.updatePrefs({ name })

                }
                console.log("Account Created")

               return this.Login({email, password})

            }
            return account;
        } catch (error) {
            console.log("Error in CreateAccount:", error.message)
            throw error
        }
    }
    async Login({ email, password }) {
        try {
            const login = await this.Account.createEmailPasswordSession(email, password)
            if (login) {
                console.log("Logged In Succesfully")

            }
            return login
        } catch (error) {
            console.log("Error in Login:", error.message)
            throw error

        }
    }

    async GetUserSessions(){
        try {
            const session = await this.Account.get()
            if(session){
                console.log(session)

            }
            return session
        } catch (error) {
            console.log("Error in GetUserSessions::", error.message)
        }
    }

    async LogOut (){
        try {
           return this.Account.deleteSessions()

        } catch (error) {
            console.log("Error in LogOut::", error.message)
        }
    }

}

const AuthObj = new AuthServices()

export default AuthObj
