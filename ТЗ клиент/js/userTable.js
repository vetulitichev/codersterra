class Table {
    constructor(){
        this.tableHead = ['Name','Surname','Email'];
        this.url ='http://localhost:3000/users'
    }
    new(tag){
        return document.createElement(tag);
    }
    getUsers(){
        fetch('http://localhost:3000/users').then((response)=>{
            return response.json();
        }).then((data)=>{
            const headers = ['name','surname','email'];
            const table = this.new('table');
            const thead = this.new('thead');
            const tbody = this.new('tbody');
            let layout = ``;
            headers.forEach((item)=>{
                let th = this.new('th');
                th.textContent = item;
                thead.appendChild(th);
            });
            data.forEach((item)=>{
                console.log(item);
                let tr = this.new('tr');
                    let td1 = this.new('td');
                    td1.textContent = item.email;
                    let td2 = this.new('td');
                    td2.textContent = item.firstName;
                    let td3 = this.new('td');
                    td3.textContent = item.lastName;
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tbody.appendChild(tr);
            });
            table.appendChild(thead);
            table.appendChild(tbody);
            //document.body.innerHTML = '';
            document.body.appendChild(table);
        });
    }
}
let table = new Table();
table.getUsers();
