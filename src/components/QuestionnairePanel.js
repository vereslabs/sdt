import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionNavigateToSection} from "../actions/index";
import {isStringEmpty, isStringInRange, areEquals} from "./utils";
import WorkflowPanel from "../components/workflowpanel";
import MenuStructureFocalPoints from "../components/MenuStructure";
import ProjectList from "../components/ProjectList"
import $ from 'jquery';


var x = 0;

class QuestionnairePanel extends Component {

   constructor(props) {
     super(props);
   }

   componentDidMount() {
    let toggleClass = $.fn.toggleClass;
    let parents = $.fn.parents;
    let on = $.fn.on;
    let css = $.fn.css;
    let data = $.fn.data;
    let fadeIn = $.fn.fadeIn;


       $('.ckbox label').on('click', function () {
         $(this).parents('tr').toggleClass('selected');
       });

       $('.btn-filter').on('click', function () {
         var $target = $(this).data('target');
         if ($target != 'all') {
           $('.table tr').css('display', 'none');
           $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
         } else {
           $('.table tr').css('display', 'none').fadeIn('slow');
         }
       });
 }


    getSections2() {
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

        return ret;
    }

    renderSectionQuestions(question, i) {

        return <tr key={x++} className={i % 2 == 0 ? "trOdd" : "trEven"}>
                <td className="col1">{question.name}</td> <td><input type="radio" name="x2" id="sq_100i" value="1" /></td>
                <td><input type="radio" name="x2" id="" value="2" /></td>
                <td><input type="radio" name="x2" id="" value="3" /></td>
                <td><input type="radio" name="x2" id="" value="4" /></td>
                <td><input type="radio" name="x2" id="" value="5" /></td>
                <td>
                  <div className="input-group">
                      <textarea className="form-control" placeholder="..." rows="2"  ></textarea>
                  </div>
                </td>
              </tr>;
    }

    renderSectionsL2(section) {

      // ------------------------------------------------
      if (areEquals(this.props.navContext.navContext.navSection, "Environment"))
      {
          return;
      }


/*
              Environment
              CoBenefits_Environment_Air CoBenefits_Environment_Soil   CoBenefits_Environment_Water  CoBenefits_Environment_NaturalRess

              Social
              Social_Jobs Social_Health_And_Safety  Education  Social_Welfare

              Economics
              Economics_Growth , Economics_Energy_Transfer , Economics_Technology_Transfer , Economics_Balance_Of_Payment
*/

        // ------------------------------------------------
        if (
              (areEquals(this.props.navContext.navContext.navSection, "Home_Dashboard" )
                && areEquals(section.name, ["Home Dashboard"]) ) )
                {
                    return (
                      <h3>HOME DASHI HERE</h3>
                    );
                }

        if (
              (areEquals(this.props.navContext.navContext.navSection, "Further_Information" )
                && areEquals(section.name, "Further information") )
              ||
              (areEquals(this.props.navContext.navContext.navSection, "Review_And_Submit" )
                && areEquals(section.name, "Review & Submit") )
              ||
              (areEquals(this.props.navContext.navContext.navSection, "Start_Co_Benefits" )
                && isStringInRange(section.name, ["1.1 Air Quality", "1.2 Soil quality and/or soil pollution", "1.3 Water quality", "1.4 Natural resources"])
                && isStringInRange(this.props.navContext.navContext.navSubSection, ["CoBenefits_Environment", "CoBenefits_Environment_Air", "CoBenefits_Environment_Soil", "CoBenefits_Environment_Water", "CoBenefits_Environment_NaturalRess"] ))
              ||
              (areEquals(this.props.navContext.navContext.navSection, "Start_Co_Benefits" )
                && isStringInRange(section.name, ["2.1 Job creation", "2.2 Health & safety", "2.3 Education", "2.4 Welfare"])
                && isStringInRange(this.props.navContext.navContext.navSubSection, ["Social", "Social_Jobs", "Social_Health_And_Safety", "Education", "Social_Welfare"] ))
              ||
              (areEquals(this.props.navContext.navContext.navSection, "Start_Co_Benefits" )
               && isStringInRange(section.name, ["3.1 Economic - Growth", "3.2 Energy transfer", "3.3 Technology transfer", "3.4 Balance of payment"])
               && isStringInRange(this.props.navContext.navContext.navSubSection, ["Economics", "Economics_Growth", "Economics_Energy_Transfer", "Economics_Technology_Transfer", "Economics_Balance_Of_Payment" ] ))
            )

          {
            if (section.questions == null) {
                return(
                        <div>
                            <h3>{ section.name }</h3>
                            {section.introText1}

                            {section.introText2}

                        </div>
                    );
            }

            return(
                    <div>
                        <h3>{ section.name }</h3>
                        {section.introText1}

                        <div className="row form-group form-group-sm">
                          <div className="col-md-6 col-md-offset-3">
                            <div className="row">
                              <ul className="list-group-small radioGroup">
                                  <li className="list-group-item"> <input type="radio" name="x1" id="r1" value="yes" /> <label htmlFor="r1">Yes (and I wish to specify)</label> </li>
                                  <li className="list-group-item"> <input type="radio" name="x1" id="r2" value="no" /> <label htmlFor="r2">No (the action has no direct impact)</label> </li>
                                  <li className="list-group-item"> <input type="radio" name="x1" id="r3" value="n/a" /> <label htmlFor="r3">N/A (the question is not relevant)</label> </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {section.introText2}

                    <table className="table table-bordered sdtable table-hover" width="100%">
                        <thead>
                          <tr><th className="col1"></th> <th className="colSm">N/A</th> <th className="colSm">No</th><th className="colSm">Slightly</th><th className="colSm">Partially</th><th className="colSm">Highly</th><th>Description</th></tr>
                        </thead>
                        <tbody>
                               { section.questions.map( (question, idx) => this.renderSectionQuestions(question, idx)) }
                        </tbody>
                    </table>

                    </div>
                );
          }
    }

    renderSectionsL1(section) {

        var subSubSections = (section.subSections != null && section.subSections.map( subSection => this.renderSectionsL2(subSection) ));
        return(
                <div  key={x++} >
                    { section.name == "" || section.name == null ? "" : <div className='sectionL0Head'>{section.name}</div>  }
                    {section.introText1}
                    <br />
                    {section.introText2}
                    {subSubSections}

                </div>
            );
    }

    getHomeDashboard() {
      return "";
    }

    renderSectionsL0(section) {


        if(areEquals(this.props.navContext.navContext.navSection, "Home_Dashboard")) {

            if (areEquals(section.name, "Home Dashboard")) {
                var subSubSections = (section.subSections != null && section.subSections.map( subSection => this.renderSectionsL1(subSection) ));
                return(
                        <div>
                            <div className="sectionL00Head">{ section.name }</div>
                            {this.renderSectionsL1(section.subSections[0])}
                            {this.getHomeDashboard()}

                        </div>
                    );
            }

          } else if (areEquals(this.props.navContext.navContext.navSection, "Start_Co_Benefits"))  {
            if (areEquals(section.name, "Start co-benefits form")) {
                var subSubSections = (section.subSections != null && section.subSections.map( subSection => this.renderSectionsL1(subSection) ));
                return(
                        <div>
                            <div className="sectionL00Head">{ section.name }</div>
                            {subSubSections}
                        </div>
                    );
            }
          } else if (areEquals(this.props.navContext.navContext.navSection, "Further_Information"))  {
            if (areEquals(section.name, "Further information")) {
                var subSubSections = (section.subSections != null && section.subSections.map( subSection => this.renderSectionsL1(subSection) ));
                return(
                        <div>
                            <div className="sectionL00Head">{ section.name }</div>
                            {subSubSections}
                        </div>
                    );
            }
          } else if (areEquals(this.props.navContext.navContext.navSection, "Review_And_Submit"))  {
            if (areEquals(section.name, "Review & Submit")) {
                var subSubSections = (section.subSections != null && section.subSections.map( subSection => this.renderSectionsL1(subSection) ));
                return(
                        <div>
                            <div className="sectionL00Head">{ section.name }</div>
                            {subSubSections}
<br /><br /><br />
                            <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    );
            }




            return null;
        }
    }

    render() {

        return (areEquals("Home_Dashboard", this.props.navContext.navContext.navSection)) ? null :  (
            <div className="questionnaire-area">
                { MenuStructureFocalPoints.sections.map(section => this.renderSectionsL0(section)) }
            </div>
        );
    }
}

function mapStateToProps({navContext}) {
	return {navContext};
}

export default connect(mapStateToProps)(QuestionnairePanel);
