export const ACTION_NAVIGATE = 'ACTION_NAVIGATE';
export const ACTION_GET_PROJECT_LIST = 'ACTION_GET_PROJECT_LIST';
export const ACTION_GET_QUERY_STRING_PARAMS = 'ACTION_GET_QUERY_STRING_PARAMS';

export  function ActionNavigateToSection(section, subSection) {
	return { type: ACTION_NAVIGATE, navSection: section,  navSubSection : subSection };
};

export  function ActionGetProjectList() {
	return { type: ACTION_GET_PROJECT_LIST };
};

export  function ActionGetQueryStringParams() {
	console.log("ActionGetQueryStringParams() called");
	return { type: ACTION_GET_QUERY_STRING_PARAMS	};
};
