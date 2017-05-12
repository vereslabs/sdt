import {ACTION_NAVIGATE} from "../actions/index";

export default function(state = { navContext: { navSection: "Home_Dashboard", navSection: "Home_Dashboard" } }, action) {

	switch (action.type) {
		case ACTION_NAVIGATE:
            var navigateTo = action.navContext;
						return { navContext : {navSection: action.navSection, navSubSection : action.navSubSection}};
	}
	return state;
}
