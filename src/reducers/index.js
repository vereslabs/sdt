import { combineReducers } from 'redux';
import NavigationReducer from "./reducer_navigation";
import ProjectListReducer from "./reducer_project_list";
import QueryStringParamReducer from "./reducer_querystringparamreducer"

const rootReducer = combineReducers({
    projectList:  ProjectListReducer,
    navContext:   NavigationReducer,
    queryParams:  QueryStringParamReducer

});

export default rootReducer;
