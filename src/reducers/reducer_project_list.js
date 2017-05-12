import {ACTION_GET_PROJECT_LIST} from "../actions/index";

export default function(  state = { projectList : [{ id: "1", title: "Project One !", created: "1-1-2017", status: "Draft"}] }, action) {

  switch (action.type) {
		case ACTION_GET_PROJECT_LIST:
						return { projectList : [
                                      { id: "1", title: "Project 1 !", created: "1-1-2017", status: "FINAL"} ,
                                      { id: "2", title: "Project 2 !", created: "1-1-2017", status: "FINAL"}
                                   ]  };
	}
	return state;
}
