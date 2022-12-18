
let form = document.querySelector('form');
let tbody = document.querySelector('tbody');
let students = [
    { surname: 'Сидоров', name: 'Иван', patronymic: 'Михайлович', birthdate: new Date('12.23.1990'), study: 2005, faculty: 'Физики' },
    { surname: 'Сидорова', name: 'Ивана', patronymic: 'Михайловна', birthdate: new Date('12.11.1994'), study: 2006, faculty: 'Астрономии' },
    { surname: 'Сорокина', name: 'Мария', patronymic: 'Алексеевна', birthdate: new Date('01.01.1992'), study: 2008, faculty: 'Математики' },
    { surname: 'Андропов', name: 'Александр', patronymic: 'Петрович', birthdate: new Date('3.10.1992'), study: 2003, faculty: 'Информатики' },
    { surname: 'Никифоров', name: 'Олег', patronymic: 'Олегович', birthdate: new Date('12.24.1995'), study: 2004, faculty: 'Химии' }
];
let name, surname, patronymic, faculty, birthdate, study;




function createTr() {
    const tr = document.createElement('tr');
    return tr;
}

function createTd(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

function getCurrentAge(date) {
    let result = ((new Date().getTime() - date) / (24 * 3600 * 365.25 * 1000)) | 0;
    switch (result % 10) {

        case 1:
            if (result % 20 > 4 && result % 20 != 11) {
                return result + ' лет';
            }
            return result + ' год';
            break;
        case 2:
        case 3:
        case 4:

            if (result % 20 > 4) {
                return result + ' лет';
            }
            return result + ' года';
            break;
        case 0:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            return result + ' лет';
            break;

    }
}

function validateDate(date) {
    if (date > new Date('1900-01-01') && date <= new Date()) {
        return false
    }
    else {
        return true
    }
}

function validateYear(date) {
    if (new Date(date) > new Date('2000') && new Date(date) <= new Date()) {
        return false
    }
    else {
        return true
    }
}

function getCurrentCourse(year) {
    let result = new Date().getFullYear() - year;
    switch (result) {
        case 0:
            return ' (' + 1 + ' курс)';
            break;
        case 1:
            if (new Date().getMonth() < 8) {
                return ' (' + 1 + ' курс)';
                break;
            }
            else
                return ' (' + 2 + ' курс)';
            break;
        case 2:
            if (new Date().getMonth() < 8) {
                return ' (' + 2 + ' курс)';
                break;
            }
            else
                return ' (' + 3 + ' курс)';
            break;
        case 3:
            if (new Date().getMonth() < 8) {
                return ' (' + 3 + ' курс)';
                break;
            }
            else
                return ' (' + 4 + ' курс)';
            break;
        case 4:
            if (new Date().getMonth() < 8) {
                return ' (' + 4 + ' курс)';
                break;
            }
            else
                return ' (Закончил обучение)';
            break;
        default:
            return ' (Закончил обучение)';
            break;

    };
}

function sortByField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}
function sortByFullName(field, secondField, thirdField) {
    return (a, b) => a[field] + ' ' + a[secondField] + ' ' + a[thirdField] > b[field] + ' ' + b[secondField] + ' ' + b[thirdField] ? 1 : -1;
}


function createStudent(name, surname, patronymic, faculty, birthdate, study) {
    return {
        name: name,
        surname: surname,
        patronymic: patronymic,
        faculty: faculty,
        birthdate: birthdate,
        study: study,
    }
}

function clearTable() {
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }
}

function displayTable(array) {
    array.forEach(el => {
        tr = createTr();
        text = el.surname + ' ' + el.name + ' ' + el.patronymic;
        td = createTd(text);
        tr.append(td);
        td = createTd(el.faculty);
        tr.append(td);
        text = el.birthdate.getDate() + '.' + (el.birthdate.getMonth() + 1) + '.' + el.birthdate.getFullYear() + ' (' + getCurrentAge(el.birthdate) + ')';
        td = createTd(text);
        tr.append(td);
        text = el.study + '-' + (Number(el.study) + 4) + getCurrentCourse(el.study);
        td = createTd(text);
        tr.append(td);
        tbody.append(tr);
    })
}

form.addEventListener('submit', (el) => {
    let msgblock = document.querySelector('.msg-block');
    let msgtext = document.querySelector('.msg-text');
    el.preventDefault();
    let tr, td, text, errormsg, errormsg1, errormsg2, errormsg3, errormsg4;
    let fullname = document.querySelector('#Full_name').value.trim();
    name = '';
    surname = '';
    patronymic = '';
    faculty = '';
    birthdate = '';
    study = '';
    if (fullname == '') {
        errormsg1 = 'Введите корректное ФИО студента. ';
    }
    else {
        errormsg1 = '';
        let names = fullname.split(' ');
        surname = names[0];
        name = names[1];
        patronymic = names[2];
    }
    faculty = document.querySelector('#faculty').value.trim();
    if (faculty == '') {
        errormsg2 = 'Введите корректный факультет студента. ';
    }
    else {
        errormsg2 = '';
        faculty = faculty;
    }
    birthdate = document.querySelector('#birthdate').valueAsDate;
    if (birthdate == '') {
        errormsg3 = 'Введите корректную дату рождения. ';
    }
    else {
        errormsg3 = '';
        if (validateDate(birthdate)) {
            errormsg3 = 'Дата рождения должна находиться в диапазоне от 01.01.1900 до текущей даты. ';
        }
        else {
            birthdate = birthdate;
        }
    }

    study = document.querySelector('#study').value;
    if (study == '') {
        errormsg4 = 'Введите корректную дату рождения. ';
    }
    else {
        errormsg4 = '';
        if (validateYear(study)) {
            errormsg4 = 'Год начала обучения должен находиться в диапазоне от 2000-го до текущего года. ';
        }
        else {
            study = study;
        }
    }
    errormsg = errormsg1 + errormsg2 + errormsg3 + errormsg4;
    if (errormsg != '') {
        msgblock.style.display = 'block';
        msgtext.textContent = errormsg;
    }
    else {
        msgblock.style.display = 'none';
        students.push(createStudent(name, surname, patronymic, faculty, birthdate, study));
        clearTable();
        displayTable(students);


    }
})

let th_full_name = document.querySelector('.th__fullname');
let th_faculty = document.querySelector('.th__faculty');
let th_birthdate = document.querySelector('.th__birthdate');
let th_study = document.querySelector('.th__study');

th_full_name.addEventListener('click', () => {
    students.sort(sortByFullName('surname', 'name', 'patronymic'));
    clearTable();
    displayTable(students);
})




th_faculty.addEventListener('click', () => {
    students.sort(sortByField('faculty'));
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }
    displayTable(students);
})

th_study.addEventListener('click', () => {
    students.sort(sortByField('study'));
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }
    displayTable(students);
})

th_birthdate.addEventListener('click', () => {
    students.sort(sortByField('birthdate'));
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }
    displayTable(students);
})


let ids = ['#filter__fullname', '#filter__faculty', '#filter__study_begin', '#filter__study_end'];



let input__fullname = document.querySelector(ids[0]);
let input__faculty = document.querySelector(ids[1]);
let input__study_begin = document.querySelector(ids[2]);
let input__study_end = document.querySelector(ids[3]);
let inputs = document.querySelector('.filter__container');


inputs.addEventListener('input', () => {
    let arr = students.slice(0),
        str = '';
    if (str = input__fullname.value.trim().toLowerCase()) {
        arr = arr.filter(({
            surname,
            name,
            patronymic
        }) => [surname, name, patronymic].some(title => title.toLowerCase().includes(str)))
    }
    if (str = input__faculty.value.trim().toLowerCase()) {
        arr = arr.filter(({
            faculty

        }) => faculty.toLowerCase().includes(str))
    }

    if (str = input__study_begin.value.trim().toLowerCase()) {

        arr = arr.filter(({

            study

        }) => study.slice(-4) == str)

    }

    if (str = input__study_end.value.trim().toLowerCase()) {

        arr = arr.filter(({

            study

        }) => +study.slice(-4) + 4 == str)
    }
    clearTable();
    displayTable(arr);
})


document.addEventListener('DOMContentLoaded', () => {
    displayTable(students);
})

