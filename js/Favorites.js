import { GithubUser } from "./GithubUser.js"

export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    async add(username){
        try{

            const userExists = this.entries.find(entry => 
                entry.login === username
            )

            console.log(userExists)

            if(userExists)
                throw new Error('Usuário já está na lista')            

            const githubUser = await GithubUser.searchUser(username)

            if(githubUser.login === undefined)
                throw new Error('Usuário não encontrado')


            this.entries = [githubUser, ...this.entries]
            this.update()
            this.save()

            return true

        }catch(error){
            alert(error.message)
        }

    }

    save(){
        localStorage.setItem(
            '@github-favorites:',
            JSON.stringify(this.entries)
        )
    }

    load(){
        this.entries = 
            JSON.parse(localStorage
                    .getItem('@github-favorites:')) || []
    }


    delete(user){
        const filteredEntries = this.entries.filter(entry => 
            entry.login !== user.login    
        )

        this.entries = filteredEntries

        this.update()
        this.save()
    }
}