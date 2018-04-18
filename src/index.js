import rangeFilter, {name as rangeFilterName} from './filters/range.filter';
import settings, {name as settingsName} from './services/settings.service';
import utilsService, {name as utilsServiceName} from './services/utils.service';
import timeService, {name as timeServiceName} from './services/time.service';
import sudokuService, {name as sudokuServiceName} from './services/sudoku.service';
import gameComponent, {name as gameComponentName} from './components/game/game.component';
import boxComponent, {name as boxComponentName} from './components/box/box.component';
import cellComponent, {name as cellComponentName} from './components/cell/cell.component';
import numbersComponent, {name as numbersComponentName} from './components/numbers/numbers.component';
import pnfComponent, {name as pnfComponentName} from './components/PNF/pnf.component';
import routerConfig from './router/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import 'angular-toastr';
import 'angular-toastr/dist/angular-toastr.min.css';
import 'angular-animate';
import '@uirouter/angularjs';

angular.module('app', ['ngAnimate', 'toastr', 'ui.router'])
	.config(routerConfig)
	.filter(rangeFilterName, rangeFilter)
	.value(settingsName, settings)
	.service(utilsServiceName, utilsService)
	.service(timeServiceName, timeService)
	.service(sudokuServiceName, sudokuService)
	.component(gameComponentName, gameComponent)
	.component(boxComponentName, boxComponent)
	.component(cellComponentName, cellComponent)
	.component(numbersComponentName, numbersComponent)
	.component(pnfComponentName, pnfComponent);