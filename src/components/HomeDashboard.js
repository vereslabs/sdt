import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionNavigateToSection} from "../actions/index";
import {ActionGetProjectList} from "../actions/index";
import ProjectList from "../components/ProjectList";
import {isStringEmpty, isStringInRange, areEquals} from "./utils";

class HomeDashboard extends Component {

  constructor(props) {
    super(props);
  }

  getCreateReportButton() {
      console.log("Is Review: " +this.isReviewMode());

      if (this.isReviewMode())
        return null;

      return (
                <div className="centerDiv"><button className="btn btn-primary btn-lg btnCreateCoBenefitsReport blueButton" onClick={this.onCreateReportClicked.bind(this)}>Create a new Co-Benefits Report ...</button></div>
             );
  }

    render() {
      if (!areEquals("Home_Dashboard", this.props.navContext.navContext.navSection))
        return (<div></div>);

        return (
              <div className="bigpagearea dashboard-content">
                  <div className="sectionL00Head">{ this.isReviewMode() ? "All Co-Benefits Reports": "My Co-Benefits Reports" }
                  <span className="user-role-label">Dashboard { this.isReviewMode() ? "CDM Action Officer": "Focal Point for Projects" }</span>
              </div>
              <ProjectList projects={this.props.projects} isReviewMode={this.isReviewMode() } />
              { this.getCreateReportButton() }
          </div>
        );
    }

    onCreateReportClicked(e) {
      this.setState({navContext: {	navSection: "Start_Co_Benefits ", navSubSection : "" } });
      console.log("onCreateReportClicked()called.");
      this.props.ActionNavigateToSection("Start_Co_Benefits");
    }

    isReviewMode() {
      return window.location.href.indexOf("review") > 0;
    }
}


function mapStateToProps(state) {
	return state;
}

function mapDispacthToProps(dispatch) {
	return bindActionCreators({ActionGetProjectList, ActionNavigateToSection}, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(HomeDashboard);
