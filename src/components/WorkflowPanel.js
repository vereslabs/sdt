import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { ActionNavigateToSection} from "../actions/index";
import {isStringEmpty, isStringInRange, areEquals} from "./utils";

class WorkflowPanel extends Component {

    constructor(props) {
      super(props);
    }

    onMenuClicked(section, subSection, e) {
      if (areEquals(section, "Home_Dashboard") && !confirm("Really leave the form? Data you have entered may not be saved.") )
          return;

      this.setState({navContext: {	navSection: section, navSubSection : subSection } });
      this.props.ActionNavigateToSection(section, subSection);
    }

    render() {
      if(areEquals("Home_Dashboard", this.props.navContext.navContext.navSection)) {
        return null;
      }

      return (
				<div className="workflow">
					<div className="workflow-inner">
						<div className="connecting-line"></div>

          <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className={ areEquals("Home_Dashboard", this.props.navContext.navContext.navSection) ? "active" : ""}  onClick={this.onMenuClicked.bind(this, "Home_Dashboard", "Home_Dashboard")}>
								<a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="" data-original-title="Step 1">
									<div className="wflabel">Home Dashboard</div>
									<span className="round-tab wfgreen">
										<i className="glyphicon glyphicon-home"></i>
									</span>
								</a>
							</li>
							<li role="presentation" className={areEquals("Start_Co_Benefits", this.props.navContext.navContext.navSection)  && this.props.navContext.navContext.navSubSection == null  ? "active" : ""}   onClick={this.onMenuClicked.bind(this, "Start_Co_Benefits", null)} >
								<a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="" data-original-title="Step 2">
									<div className="wflabel">Start co-benefits form</div>
									<span className="round-tab wfgreen">
										<i className="glyphicon glyphicon-ok"></i>
									</span>
								</a>
							</li>
							<li role="presentation" className={isStringInRange(this.props.navContext.navContext.navSubSection, ["CoBenefits_Environment", "CoBenefits_Environment_Air",  "CoBenefits_Environment_Soil", "CoBenefits_Environment_Water", "CoBenefits_Environment_NaturalRess"]) ? "active" : ""}    onClick={this.onMenuClicked.bind(this, "Start_Co_Benefits", "CoBenefits_Environment")} >
								<a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="" data-original-title="Step 3">
									<div className="wflabel">Environment</div>
									<span className="round-tab wfyellow">
										<i className="glyphicon glyphicon-pencil"></i>
									</span>
								</a>
							</li>

							<li role="presentation" className={ isStringInRange(this.props.navContext.navContext.navSubSection, ["Social", "Social_Jobs", "Social_Health_And_Safety", "Education", "Social_Welfare"])  ? "active" : ""}   onClick={this.onMenuClicked.bind(this, "Start_Co_Benefits", "Social")} >
								<a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="" data-original-title="Step 4">
									<div className="wflabel">Social</div>
									<span className="round-tab wfred">
										<i className="glyphicon glyphicon-pencil"></i>
									</span>
								</a>
							</li>

							<li role="presentation" className={ isStringInRange(this.props.navContext.navContext.navSubSection, ["Economics", "Economics_Growth", "Economics_Energy_Transfer", "Economics_Technology_Transfer", "Economics_Balance_Of_Payment"])   ? "active" : ""}  onClick={this.onMenuClicked.bind(this, "Start_Co_Benefits", "Economics")} >
								<a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="" data-original-title="Step 5">
									<div className="wflabel">Economics</div>
									<span className="round-tab wfred">
										<i className="glyphicon glyphicon-pencil"></i>
									</span>
								</a>
							</li>

							<li role="presentation" className={this.props.navContext.navContext.navSection == "Further_Information"  ? "active" : ""}  onClick={this.onMenuClicked.bind(this, "Further_Information", "null")} >
								<a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="" data-original-title="Step 6">
									<div className="wflabel">Further Information</div>
									<span className="round-tab wfred">
										<i className="glyphicon glyphicon-pencil"></i>
									</span>
								</a>
							</li>

							<li role="presentation" className={this.props.navContext.navContext.navSection == "Review_And_Submit"  ? "active" : ""}  onClick={this.onMenuClicked.bind(this, "Review_And_Submit", "null")} >
								<a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="" data-original-title="Complete">
									<div className="wflabel">Review and Submit</div>
									<span className="round-tab wfgreen">
										<i className="glyphicon glyphicon-check"></i>
									</span>
								</a>
							</li>

						</ul>
					</div>
				</div>
        );
    }
}


function mapStateToProps({navContext}) {
	return {navContext};
}

function mapDispacthToProps(dispatch) {
	return bindActionCreators({ActionNavigateToSection}, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(WorkflowPanel);


/*
function mapDispacthToProps({dispatch}) {
	return bindActionCreators({ActionNavigateToSection}, dispatch);
}

export default connect(null, mapDispacthToProps)(WorkflowPanel);

*/
