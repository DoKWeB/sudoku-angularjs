import rangeFilter, {name as rangeFilterName} from './filters/range.filter';
import settings, {name as settingsName} from './services/settings.service';
import utilsService, {name as utilsServiceName} from './services/utils.service';
import timeService, {name as timeServiceName} from './services/time.service';
import sudokuService, {name as sudokuServiceName} from './services/sudoku.service';
import gameComponent, {name as gameComponentName} from './components/game/game.component';
import boxComponent, {name as boxComponentName} from './components/box/box.component';
import cellComponent, {name as cellComponentName} from './components/cell/cell.component';
import numbersComponent, {name as numbersComponentName} from './components/numbers/numbers.component';
import './index.scss';

angular.module('app', [])
	.filter(rangeFilterName, rangeFilter)
	.value(settingsName, settings)
	.service(utilsServiceName, utilsService)
	.service(timeServiceName, timeService)
	.service(sudokuServiceName, sudokuService)
	.component(gameComponentName, gameComponent)
	.component(boxComponentName, boxComponent)
	.component(cellComponentName, cellComponent)
	.component(numbersComponentName, numbersComponent);