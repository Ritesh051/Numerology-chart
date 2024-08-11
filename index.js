const themeToggler = document.querySelector(".theme-toggler");
var days = [];
var planetName = [];
var dayNumberMap = {};
var gridNumbers = [];

themeToggler.addEventListener('click', () => {
    setTimeout(() => {
        document.body.classList.toggle('dark-theme-variables');
        document.body.classList.toggle('light-theme-variables');

        const spans = themeToggler.querySelectorAll('span');
        spans[0].classList.toggle('active');
        spans[1].classList.toggle('active');
    }, 100);
});
const populateGridNumbers = (num)=>{
    num.split('').forEach(element => {
        if(element>'0' && element<='9'){
            gridNumbers.push(element-'0');
        }
    });
}
const resetData =()=>{
    days = [];
    planetName = [];
    dayNumberMap = {};
    gridNumbers = [];
    resetGrid();
}
const populateData = () => {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    planetName = ["Sun","Moon","Jupiter","Rahu","Mercury","Venus","Ketu","Saturn","Mars"];
    dayNumberMap = { "Sunday": 1, "Munday": 2, "Thursday": 3, "Wednesday": 5, "Friday": 6, "Saturday": 8, "Tuesday": 9 };
    gridNumbers = [];
}
function getDay(event) {
    event.preventDefault();
    resetData();
    populateData();
    const inputDate = document.getElementById('date').value;
    
    const date = new Date(inputDate);

    const dayOfWeek = days[date.getDay()];
    document.getElementById('dayOfweek').textContent = dayOfWeek;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    populateGridNumbers(`${day}`);
    populateGridNumbers(`${month}`);
    populateGridNumbers(`${year}`.toString().substring(2,4));

    const dateString = `${day}${month}${year}`;

    let destinyNumber = getDestinyNumber(dateString);
    let basicNumber = getBasicNumber(day);
    const mahaDashaNum = getMahaDasha(basicNumber,year);
    const antarDashaNum = getAntarDasha(day,month);
    gridNumbers = [...gridNumbers,basicNumber,destinyNumber,mahaDashaNum,antarDashaNum];
    gridNumbers.sort();
    document.getElementById('Destiny').textContent = destinyNumber;
    document.getElementById('base').textContent = basicNumber;
    document.getElementById('mahadasha').textContent = mahaDashaNum + " , " + planetName[mahaDashaNum-1];
    document.getElementById('antardasha').textContent = antarDashaNum + " , " +  planetName[antarDashaNum-1];
    document.getElementById('array').textContent = gridNumbers;
    console.log(gridNumbers);
    setGridNumbers();
}
const resetGrid = () =>{
    var grid = document.getElementById("grid").children;
    for(let i = 0; i<grid.length; i++){
        grid[i].classList.remove('grid-part-selected');
        grid[i].textContent = grid[i].id;
    }
}
const setGridNumbers = () => {
    let counts = {};
    gridNumbers.forEach(element => {
        if(counts[element]){
            counts[element]++;
        }else{
            counts[element] = 1;
        }
    })
    var grid = document.getElementById("grid").children;
    for(let i = 0; i<grid.length; i++){
        let text = grid[i].textContent;
        if(counts[text]){
            let content = '';
            for(let i = 0; i<counts[text]; i++){
                content+=text
            }
            grid[i].textContent = content;
            grid[i].classList.add('grid-part-selected');
        }
    }
}
const getAntarDasha = (day,month)=>{
    const currYear = (new Date()).getFullYear();
    const year = currYear.toString().substring(2,4);
    const date = new Date(currYear,month-1,day);
    const dayNum = dayNumberMap[days[date.getDay()]];
    let destinyNumber = getDestinyNumber(`${date.getDate()}${date.getMonth()+1}${year}`);
    let antarDashaNum = getDestinyNumber(`${destinyNumber}${dayNum}${0}`);
    return antarDashaNum;
    
}
const getBasicNumber = (day)=>{
    let basicNumber = day;
    while (basicNumber >= 10) {
        basicNumber = basicNumber.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
    }
    return basicNumber;
}
const getDestinyNumber = (dob)=>{
    let destinyNumber = dob.split('').map(Number).reduce((acc, num) => acc + num, 0);
    while (destinyNumber >= 10) {
        destinyNumber = destinyNumber.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
    }
    return destinyNumber;
}
const getMahaDasha = (basicNum,startYear)=>{
    const currYear = (new Date()).getFullYear();
    let mahaDasha = basicNum;
    for(let i = startYear; i<currYear; ){
        i+=mahaDasha;
        if(i<currYear){
            mahaDasha++;
            if(mahaDasha>9){
                mahaDasha=1;
            }   
        }     
    }
    return mahaDasha;
}