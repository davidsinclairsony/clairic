import { cloudSaveOther } from './cloud';

export const settingsReplace = settings => dispatch => {
	dispatch({
		type: 'SETTINGS_REPLACE',
		payload: { settings },
	});
	dispatch(cloudSaveOther());
};

export const settingsReplaceLocal = settings => ({
	type: 'SETTINGS_REPLACE',
	payload: { settings },
});
