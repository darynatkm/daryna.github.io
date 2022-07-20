
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const winArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];


const setUp = () =>{

    arr.sort(()=>Math.random()-0.5);
    // innerHTML + id 
    let td = document.getElementsByTagName('td');
    // Прибрати останній елемент
    for (let index = 0; index < arr.length; index++) {
        td[index].id = arr[index];
        td[index].innerHTML = td[index].id        
    }    

}

setUp()

// swap(): щоб поміняти внутрішній HTML і клас (перемикати)
const swap = (event) => {
    let dummy;
    let empty = document.getElementById('empty')
    if(check(event)){
        event.classList.add('empty');
        empty.classList.remove('empty')
        dummy = empty.innerHTML
        empty.innerHTML = event.innerHTML
        event.innerHTML = dummy
        empty.id = event.id
        event.id = 'empty'
    }
    else alert('You cannot swap with this tile')

    win();
    
}
    
       

const win = () => {
    let flag = 0;
    let tdArr = document.getElementsByTagName('td')
    let checkArr = [];
    for (let index = 0; index < tdArr.length; index++) {
        checkArr.push(tdArr[index].innerHTML);
        
    }

    for (let index = 0; index < winArr.length; index++) {
        if(checkArr[index] == winArr[index]){
            flag++;
        }    
    }
    if(flag === 15){
        alert('Congrats! Success!')
        setUp();
        return true;
    }
    else {
        return false;
    }


}

const check = (event) => {

    let temp = [];
    let td = document.getElementsByTagName('td')
    for (let index = 0; index < td.length; index++) {
        temp.push(td[index].innerHTML);
        
    }
    if (temp[temp.indexOf(event.innerHTML) + 1] == '' || temp[temp.indexOf(event.innerHTML) - 1] == '' || temp[temp.indexOf(event.innerHTML) - 4] == '' || temp[temp.indexOf(event.innerHTML) + 4] == ''){

        return true;
    }
    else return false;
}

