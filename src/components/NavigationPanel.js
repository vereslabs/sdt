import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import MenuStructureFocalPoints from "../components/MenuStructure";
import {ActionNavigateToSection} from "../actions/index";
import {isStringEmpty, isStringInRange, areEquals} from "./utils";

class NavigationPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
    			navContext : { navSection: "Home_DashBoard", navSubSection: "Home_DashBoard" }
    		};
    }

    getProjectDetails(prj) {
        return (
            <option key={prj.id}> {prj.id} - {prj.title} </option>
        );
    }

    getSections() {
        var ret = "Structure: ";

        for(var i = 0; i < MenuStructureFocalPoints.sections.length; i++) {
           var section = MenuStructureFocalPoints.sections[i];
            ret +=  " - " + section.name;

            var textSubSection = "";
            for(var j = 0; j < section.subSections.length; j++) {
               var subSection = section.subSections[j];
                textSubSection +=  subSection.name + ",  ";

                    var textSubSection2 = "";
                    for(var k = 0; subSection.subSections != null && k < subSection.subSections.length; k++) {
                       var subSection2 = subSection.subSections[k];
                        textSubSection2 +=  subSection2.name + ",  ";

                    }

                    if (textSubSection2 !== "") {
                        textSubSection += " [" + textSubSection2 +"], ";
                    }


            }

            if (textSubSection !== "") {
                ret += " (" + textSubSection +")";
            }
        }

        // MenuStructureFocalPoints.map()

        return ret;
    }

    renderSubSections2(subSection2) {
        if (subSection2.name == "default")
            return (<span />);

        return (
            <div className="sideBarMenuL2"  onClick={this.onMenuClicked.bind(this, subSection2.navSection, subSection2.navSubSection)}  ><a href="#">{subSection2.name}</a></div>
        );
    }

    renderSubSections1(subSection1) {
        if (subSection1.name == "default")
            return null;

        var subSubSections = (subSection1.subSections != null && subSection1.subSections.map((subSec2) => this.renderSubSections2(subSec2) ));

        return (
            <div>
                <div className="sideBarMenuL1" onClick={this.onMenuClicked.bind(this, subSection1.navSection, subSection1.navSubSection)}  ><a href="#">{subSection1.name}</a></div>
                {subSubSections}

            </div>
        );
    }

    onMenuClicked(section, subSection, e) {
      if (areEquals(section, "Home_Dashboard") && !confirm("Really leave the form? Data you have entered may not be saved.") )
          return;

      this.setState({navContext: {	navSection: section, navSubSection : subSection } });
      console.log("NavigationPanel, onMenuClicked()called. Section: "+section+" , Sub-Section: "+ subSection+" . " );
      this.props.ActionNavigateToSection(section, subSection);
    }

    renderSections(section) {

        return (
            <div>
                 <div className="sideBarMenuL0" onClick={this.onMenuClicked.bind(this, section.navSection, section.navSubSection)}  ><a href="#">{section.name}</a></div>
                { section.subSections.map( subSec1 => this.renderSubSections1(subSec1) ) }
            </div>
        );
    }


    render() {
      if (areEquals("Home_Dashboard", this.props.navContext.navContext.navSection))
        return (<div></div>);

        return (
            <nav className="navigation-panel">
                <div className="navTeaser">Navigation</div>
                <select className="form-control projSelector" title="Please select a project for create a co-benefits report...">
                    <option id='0' key='def'>Select a project ...</option>
                    { this.props.projectList.map( this.getProjectDetails )}
                </select>

                  { MenuStructureFocalPoints.sections.map( section => this.renderSections(section))}

            </nav>
        );
    }
}


/*
function mapStateToProps({navContext}) {
	return {navContext};
}

export default connect(mapStateToProps)(NavigationPanel);
*/


function mapStateToProps({navContext}) {
	return {navContext};
}

function mapDispacthToProps(dispatch) {
	return bindActionCreators({ActionNavigateToSection}, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(NavigationPanel);
