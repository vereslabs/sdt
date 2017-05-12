import {ACTION_GET_QUERY_STRING_PARAMS} from "../actions/index";

export default function(  state = { queryParams : { isReviewMode : false} }, action) {
	console.log("--------- QueryString Reducer called. ActrionType:  "+action.type+"	--------------");

  switch (action.type) {
		case ACTION_GET_QUERY_STRING_PARAMS:
						return { queryParams : {isReviewMode : window.location.href.indexOf("review") > 0 }  };
	}
	return state;
}
