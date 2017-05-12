import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import WorkflowPanel from "../components/workflowpanel";
import QuestionnairePanel from "../components/questionnairepanel";
import FooterNavigation from "../components/footernavigation";
import NavigationPanel from "../components/navigationpanel";
import HomeDashboard from "../components/HomeDashboard";
import {ActionGetQueryStringParams} from "../actions/index";


class App extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { projects: this.props.projects, queryParams : this.props.queryParams, isReviewMode : window.location.href.indexOf("review") > 0  };

        props.ActionGetQueryStringParams();
    }

    onSubmit(e) {
        e.preventDefault();
        alert("onSubmit() called!");
    }


    projects = [
                    { id: "02767", title:"Methane capture and combustion from Animal Waste Management System (AWMS)", created: "13-05-2017", status: "Draft" },
                    { id: "02896", title:"SGCC In-advance Distribution Transformer Replacement CDM Programme", created: "13-05-2017", status: "Draft" },
                    { id: "04041", title:"Promotion of Biomass Based Heat Generation Systems in India", created: "13-05-2017", status: "Draft" },
                    { id: "04302", title:"SASSA Low Pressure Solar Water Heater Programme", created: "13-05-2017", status: "Submitted" },
                    { id: "04791", title:"Improved Cooking Stoves in Bangladesh", created: "13-05-2017", status: "Submitted" },
                    { id: "05067", title:"Improved Cooking Stoves for Nigeria Programme of Activities", created: "13-05-2017", status: "Request for clarification" },
                    { id: "10019", title:"Vertical Shaft Brick Kiln (VSBK) Programme of Activities for South Africa", created: "13-05-2017", status: "Request for clarification" },
                    { id: "PH00001", title:"Test Pre-Registration Project 01", created: "13-05-2017", status: "Request for clarification" },
                    { id: "PRtest21AC", title:"Pre-Registration Project Test 21AC", created: "13-05-2017", status: "Submitted" },
                    { id: "PRtest22JG", title:"Pre-Registration Project Test 22JG", created: "13-05-2017", status: "Submitted" },
                    { id: "PRtest23JD", title:"Pre-REgistration Project Test 23JD", created: "13-05-2017", status: "Submitted" },
                    { id: "PH00002", title:"Test Pre-Registration Project 02", created: "11-05-2017", status: "Published" },
                    { id: "PH00003", title:"Test Pre-Registration Project 03", created: "13-05-2017", status: "Published" },
                    { id: "PH00004", title:"Test Pre-Registration Project 04", created: "07-05-2017", status: "Published" },
                    { id: "PH00005", title:"Test Pre-Registration Project 05", created: "13-05-2017", status: "Published" },
                    { id: "PH00006", title:"Test Pre-Registration Project 06", created: "23-05-2017", status: "Submitted" },
                    { id: "PH00007", title:"Test Pre-Registration Project 07", created: "11-05-2017", status: "Submitted" }
        ]





    render() {
  /* ../SiteAssets/SDTool/img/head1.jpg    */
      return (
          <div className="container">
            <div className="heading-img"><img src="./img/head1.jpg" className="respImg" /></div>
              <div className="mainContainer">
                <HomeDashboard projects={this.projects} />
                  <form onsubmit={this.onSubmit}>
                      <div className="mainLeftArea container-fluid row">
                            <WorkflowPanel />
                            <QuestionnairePanel projects={this.projects} />
                            <NavigationPanel projectList={this.projects } />
                      </div>
                      <FooterNavigation isReviewMode={this.state.isReviewMode }/>
                  </form>
                </div>
              </div>
      );
    }
}

function mapStateToProps(state) {
	return state;
}

function mapDispacthToProps(dispatch) {
	return bindActionCreators({ActionGetQueryStringParams}, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(App);
