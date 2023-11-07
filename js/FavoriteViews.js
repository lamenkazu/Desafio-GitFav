import { Favorites } from "./Favorites.js";

export class FavoriteViews extends Favorites{
    constructor(root){
        super(root)
        this.tableContainer = document.querySelector('.table-container')
        this.tableEmptyAdvertise = document.querySelector('.table-empty-advertise')
        this.tbody = this.root.querySelector('main .table-container table tbody')
        this.usernameInput = this.root.querySelector('#find')
        this.addButton = this.root.querySelector('.input-wrapper button')



        this.onAdd()
        this.update()
    }

    addUsernameOnList() {
        const {value} = this.usernameInput

        this.add(value)
            .then(res => 
                res ? this.usernameInput.value = '' : _
            )


    }

    onAdd(){
        
        this.addButton.onclick = this.addUsernameOnList

        this.usernameInput.onkeyup = (event) => {
            if(event.key === 'Enter'){
                this.addUsernameOnList()
            } 
        }
        
    }

    update(){
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user p').innerHTML = user.name
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user span').innerHTML = user.login
            row.querySelector('.repositories').innerHTML = user.public_repos
            row.querySelector('.followers').innerHTML = user.followers
            
            row.querySelector('.remove').onclick = () => {
                const isOkToDelete = confirm('Tem certeza que deseja deletar essa linha?')

                if(isOkToDelete){
                    this.delete(user)
                }
            }

            this.tbody.append(row)

        })

        

        this.toggleTableEmptyState()

    }

    toggleTableEmptyState(){
        if(this.tbody.childElementCount === 0){
            this.tableContainer.classList.add('table-empty')
            this.tableEmptyAdvertise.classList.remove('sr-only')
        }else{
            this.tableContainer.classList.remove('table-empty')
            this.tableEmptyAdvertise.classList.add('sr-only')
        }
    }

    createRow(){
        const tr = document.createElement('tr')
        
        tr.innerHTML = 
        `
            <td class="user">
                <img src="https://github.com/lamenkazu.png" alt="Imagem de lamenkazu">
                <a target="_blank" href="https://github.com/">
                    <p>Erick Etiene</p>
                    <span>/lamenkazu</span>
                </a>
            </td>
            <td class="repositories">
                71
            </td>
            <td class="followers">
                8
            </td>
            <td><button class="remove">Remover</button></td>
        `

        return tr
        
    }

    removeAllTr(){
        this.tbody.querySelectorAll('tr')
            .forEach(tr => {
                tr.remove()
            })
    }
}