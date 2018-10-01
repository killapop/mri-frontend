import { observable } from 'mobx';

const appState = observable({
	authenticated: false,
	users: [
		{
			role: 'facilitator',
			first_name: 'Willie',
			last_name: 'Wonka',
			username: 'Will the Wonk',
			organisation: 'MRI',
			email: 'willie@wonka.org'
		},
		{
			role: 'organisation',
			first_name: 'Jackie',
			last_name: 'Chan',
			username: 'Kung-fu Panda',
			organisation: 'Golden Dragon film company',
			email: 'jackie@chan.4'
		},
		{
			role: 'beneficiary',
			first_name: 'Indiana',
			last_name: 'Jones',
			username: 'Indi',
			organisation: 'Holy Grail Excavators',
			email: 'indi@500.org'
		}
	]
});

export default appState;
