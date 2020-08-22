
//Importing the main function in app js
import {performAction} from './js/app';
import {getTripDate} from './server/index';

//Importing the style sheet
import './styles/style.scss';

document.getElementById('generate').addEventListener('click', performAction);

// Exporting everything
export {performAction, getTripDate}
