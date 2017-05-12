import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionNavigateToSection} from "../actions/index";
import {isStringEmpty, isStringInRange, areEquals} from "./utils";

class FooterNavigation extends Component {

    onMenuClicked(section, subSection, e) {
      this.setState({navContext: {	navSection: section, navSubSection : subSection } });
      this.props.ActionNavigateToSection(section, subSection);
    }


    render() {

      if (areEquals("Home_Dashboard", this.props.navContext.navContext.navSection))
        return (<div></div>);

        var button1 = null, button2 = null, button3 = null;

        if (this.props.isReviewMode) {
            button1 = <button type="button" className="btn btn-primary q-navigation-button navButton blueButton margLeft50">Reject</button>;
            button2 = <button type="button" className="btn btn-primary q-navigation-button navButton blueButton">Request Clarification</button>;
            button3 = <button type="button" className="btn btn-primary q-navigation-button navButton blueButton">Approve &amp; Publish</button>;
        } else {
            button1 = <button type="button" onClick={this.onButtonClicked.bind(this, "Save and submit the current report for approval?", "SUBMIT")} className="btn btn-primary q-navigation-button navButton blueButton margLeft50" >Submit</button>;
            button2 = <button type="button" onClick={this.onButtonClicked.bind(this, "Save the current report?", "SAVE")} className="btn btn-primary q-navigation-button navButton blueButton">SAVE</button>;
        }

        return (
            <div className="clearfix clearFix q-navigation centerDiv margTop20 navbar  footerNav">
                <button type="button" className="btn btn-primary q-navigation-button navButton blueButton">Previous</button>
                <button type="button" className="btn btn-primary q-navigation-button navButton blueButton">Next</button>
                { button1 }
                { button2 }
                { button3 }
                <button type="button"onClick={this.onButtonClicked.bind(this, "Cancel the current report and retorn to Home Dashboard? Your unsaved data will be lost.", "CANCEL" )}  className="btn btn-primary q-navigation-button navButton greenButton margLeft50">Cancel &amp; Return</button>
                <br /><br /><br /><br />
                {this.props.navContext.navContext.navSection}
                <br />
                {this.props.navContext.navContext.navSubSection}
            </div>
        );
    }

    onButtonClicked(message, context, e) {
      e.preventDefault();
      var confirmed = confirm(message);

      if (confirmed && areEquals("CANCEL", context))
          this.props.ActionNavigateToSection("Home_Dashboard");
    }
}


function mapStateToProps({navContext}) {
	return {navContext};
}

function mapDispacthToProps(dispatch) {
	return bindActionCreators({ActionNavigateToSection}, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(FooterNavigation);
