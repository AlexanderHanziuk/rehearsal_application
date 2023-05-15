import './scripts/router/RouterOutlet';
import './scripts/router/RouterLink';
import './styles/style.scss';
import './styles/_fonts.scss';
import './styles/reset.scss';
import { Router } from './scripts/router/Router';
import { StatisticsPage } from './scripts/router/pages/StatisticsPage';
import { ReservationPage } from './scripts/router/pages/ReservationPage';
import { CurrentRHPage } from './scripts/router/pages/CurrentRHPage';
import { SongsPage } from './scripts/router/pages/SongsPage';
import { DraftPage } from './scripts/router/pages/DraftPage';

// Router Scripts Start

const appRouter = new Router([
	{
		path: 'statistics',
		page: StatisticsPage,
	},
	{
		path: 'reservation',
		page: ReservationPage,
	},
	{
		path: 'current',
		page: CurrentRHPage,
	},
	{
		path: 'songs',
		page: SongsPage,
	},
	{
		path: 'draft',
		page: DraftPage,
	},
]);

appRouter.start();

// Router Scripts End