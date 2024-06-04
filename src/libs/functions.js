export const getValueByLang = (data, langName = 'rusText') => {
	if(typeof data === 'object' && Object.keys(data).length > 0) {
		if(langName in data) {
			return data[langName];
		}

		return Object.values(data)[0];
	}
	return '';
}