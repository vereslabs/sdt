import {connect} from "react-redux";
import React, { Component } from "react";
import {bindActionCreators} from "redux";
import {ActionGetProjectList} from "../actions/index";
import {isStringEmpty, isStringInRange, areEquals} from "./utils";

var x = 0;

class ProjectList extends Component {
    constructor(props) {
      super(props);
      this.props.ActionGetProjectList();
    }

    render() {
      if (this.props.projectList == null || this.props.projectList.length == 0) {
        return (
          <p>The list of projects could not be loaded...</p>
        );
      }

      return (
        <div className="projects">
            <table className="table table-striped table-hover table-condensed table-bordered project-list ">
              <thead>
                <tr><th style={{width: "60px", whiteSpace: "nowrap"}}>Proj.No.</th><th>Title</th><th style={{width: "170px"}}>Created</th><th style={{width: "170px"}}>Status</th><th style={{width: "180px", whiteSpace: "nowrap"}}>Commands</th></tr>
              </thead>
              <tbody>{ this.props.projects.map((proj, i) => this.getProjectDetails(proj, i)) }</tbody>
            </table>
        </div>
      );
    }

    getProjectDetails(proj) {

      return (<tr key={x++} className={this.getClassNameFor(proj.status)}><td>{proj.id}</td><td>{proj.title}</td><td>{proj.created}</td><td>{proj.status}</td><td>{this.getButtons(proj)}</td></tr>) ;
    }

    getButtons(proj) {
        if (this.props.isReviewMode) {
          if (proj.status=="Submitted")
              return (<button className="btn btn-primary btn-xs greenButton" >Review Report</button>);
          else
              return (<button  className="btn btn-primary btn-xs blueButton">View</button>);
        } else {
            if (proj.status=="Submitted")
                return (<button className="btn btn-primary btn-xs blueButton" onClick={this.onWithdrawClicked.bind(this)} >Withdraw</button>);
            else
                return (<button  className="btn btn-primary btn-xs blueButton" onClick={this.onDeleteClicked.bind(this)} >Delete</button>);
        }
    }

    getClassNameFor(projStatus) {

        if (this.props.isReviewMode) {
            if (areEquals(projStatus, "Request for clarification"))
                return "info";
            else if (areEquals(projStatus, "Submitted"))
                return "danger";
            //else if (areEquals(projStatus, "Submitted"))
                //  return "info";
        } else {
            if (areEquals(projStatus, "Request for clarification"))
                return "danger";
            else if (areEquals(projStatus, "Published"))
                return "info";
            //else if (areEquals(projStatus, "Submitted"))
                //  return "success";
        }

        return "";
    }

    onDeleteClicked(section, subSection, e) {
      e.preventDefault();
      confirm("Really DELETE the selected co-Benefits Report?");
    }

    onWithdrawClicked(section, subSection, e) {
      confirm("Really WITHDRAW the selected co-Benefits Report?");
      e.preventDefault();
    }
}

  function mapStateToProps(state) {
  	return state;
  }

  function mapDispacthToProps(dispatch) {
  	return bindActionCreators({ActionGetProjectList}, dispatch);
  }

  export default connect(mapStateToProps, mapDispacthToProps)(ProjectList);
