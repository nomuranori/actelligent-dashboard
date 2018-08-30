import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import "react-table/react-table.css";
import Chance from "chance";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import matchSorter from 'match-sorter'
import testData from "../Events/test_data";

import SweetAlert from "react-bootstrap-sweetalert";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Cancel from "@material-ui/icons/Cancel";

import AccessTime from "@material-ui/icons/AccessTime";
import NotInterested from "@material-ui/icons/NotInterested";
import Build from '@material-ui/icons/Build';
import DateRange from "@material-ui/icons/DateRange";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import Danger from "components/Typography/Danger.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import { dataTable } from "variables/general.jsx";
import Table from "components/Table/Table.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// material components
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";

import styles from "./index.style"

const CheckboxTable = checkboxHOC(ReactTable);

const chance = new Chance();



class ClientRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      email_alert: null,
      requestdetail_alert: null,
      show: false,
      selectedValue: null,
      selectedEnabled: "b",
      data: [],
      columns: [],
      selection: [],
      selectAll: false
    };    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this)
  }
  componentWillMount() {
    this.setState({
      data:this.getData(),
      columns: this.getColumns()
    })
  }
  getData = () => {
    return testData.map((prop, key) => {
     
      return {
        _id: key,
        clientrequest: key%2==0?"clientrequest1":"clientrequest2",
        date: (new Date()).toDateString(),
        actions: (
          
          // we've added some custom button actions
          <div className="actions-right">
            {key%3==0 && <Button
                        justIcon
                        onClick={() => {
                            this.basicEmailAlert()
                        }}
                        color="warning"
                        className="edit"
                    >
                    <Build />
                </Button>
            }
            {key%3==1 && <Button
                        justIcon
                        onClick={() => {
                        //this.props.history.push("/event-registered")
                        }}
                        color="warning"
                        className="edit"
                    >
                    <AccessTime />
                </Button>
            }
            {key%3==2 && <Button
                        justIcon
                        onClick={() => {
                        //this.props.history.push("/event-registered")
                        }}
                        color="warning"
                        className="edit"
                    >
                    <CheckCircleOutline />
                </Button>
            }
          </div>
        )
      };
    })
  }
  getColumns = () => {
    const columns = [
      {
        Header: "No",
        accessor: "_id",
        sortable: true,
        filterable: false
      },
      {
        Header: "Client Request",
        accessor: "clientrequest",
        sortable: true,
        filterable: true,

      },
      {
        Header: "Date",
        accessor: "date",
        sortable: true,
        filterable: true,
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        filterable: false
      }
    ]
    return columns;
  }
  toggleSelection = (key, shift, row) => {
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?
      
      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).
      
      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).
      
      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'. 
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };
  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }

  basicAlert = () => {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block",overflow:"scroll", height:"70%", top: "20%", marginTop: 0}}
          title={"Fees of Selected"}
          showConfirm={false}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
        <Table
          hover
          tableHead={["Item", "Value"]}
          className={this.props.classes.modalStyle}
          tableData={[
            {
              color: "success",
              data: [
                "Broker's Revenue Cut",
                "USD 800",
              ]
            },
            ["Actelligent's Revenue Cut", "USD 200"],
            {
              color: "success",
              data: [
                "Broker's Revenue Cut",
                "USD 800",
              ]
            },
            ["Actelligent's Revenue Cut", "USD 200"],
            {
              color: "success",
              data: [
                "Broker's Revenue Cut",
                "USD 800",
              ]
            },
            ["Actelligent's Revenue Cut", "USD 200"],
            {
              color: "success",
              data: [
                "Broker's Revenue Cut",
                "USD 800",
              ]
            },
            ["Actelligent's Revenue Cut", "USD 200"],
            {
              color: "success",
              data: [
                "Broker's Revenue Cut",
                "USD 800",
              ]
            },
            ["Actelligent's Revenue Cut", "USD 200"],
          ]}
        />
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }

  basicRequestDetailAlert = () => {
    const {classes} = this.props
    const content = <GridContainer>
    <GridItem xs={12} sm={12} md={6} lg={6}>
      <Card>
        <CardBody>
          <h4>SUBJECT & DATE</h4>
          <Table
            tableHeaderColor="primary"
            tableData={[
              [<b>Theme</b>, "AI, Robotics"],
              [<b>Sector</b>, "Technology"],
              [<b>Region</b>, "Japan"],
              [<b>Date</b>, "5-9 September 2018"],
            ]}
            coloredColls={[3]}
            colorsColls={["primary"]}
          />
        </CardBody>
      </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={6} lg={6}>
      <Card>
        <CardBody>
          <h4>PARTICIPANTS</h4>
          <Table
            tableHeaderColor="primary"
            tableData={[
              [<b>Type</b>, "Broker Event"],
              [<b>Cosporates</b>, <Check />],
              [<b>Industry Experts</b>, <Close />],
              [<b>Government Officials</b>, <Check />],
              [<b>The required approval to meet with government officials</b>, <Close />],
            ]}
            coloredColls={[3]}
            colorsColls={["primary"]}
          />
        </CardBody>
      </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={6} lg={6}>
      <Card>
        <CardBody>
          <h4>CORPORATE</h4>
          <Table
            tableHeaderColor="primary"
            tableData={[
              [<b>Investor Relations</b>, <Check />],
              [<b>Senior Management</b>, <Close />],
              [<b>Site Visit</b>, <Check />],
            ]}
            coloredColls={[3]}
            colorsColls={["primary"]}
          />
        </CardBody>
      </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={6} lg={6}>
      <Card>
        <CardBody>
          <h4>COMPANY PREFERENCE</h4>
          <Table
            tableHeaderColor="primary"
            tableData={[
              [<b>Company A</b>],
              [<b>Company B</b>],
              [<b>Company C</b>],
            ]}
            coloredColls={[3]}
            colorsColls={["primary"]}
          />
        </CardBody>
      </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={6} lg={6}>
      <Card>
        <CardBody>
          <h4></h4>
          <Table
            tableHeaderColor="primary"
            tableData={[
              [<b>Total No.of Participant</b>, "1"],
              [<b>Participants</b>, "Charmaine Lo, Pinpoint Asset management"],
            ]}
            coloredColls={[3]}
            colorsColls={["primary"]}
          />
        </CardBody>
      </Card>
    </GridItem>
    <GridItem xs={12} sm={12} md={6} lg={6}>
      <Card>
        <CardBody>
          <h4>ADDITIONAL REQUEST</h4>
          <Table
            tableHeaderColor="primary"
            tableData={[
              [<b>Need Translation Support</b>, <Check />],
              [<b>Language</b>, "Chinese"],
              [<b>Need Logistic Support</b>, <Close />],
              [<b>Need Accomodation</b>, <Close />],
            ]}
            coloredColls={[3]}
            colorsColls={["primary"]}
          />
        </CardBody>
      </Card>
      <Button onClick={()=>this.hideRequestDetailAlert()} color="primary" className={classes.floatRight}>Export</Button>
    </GridItem>
  </GridContainer>
    this.setState({
      alert: (
        <div>
          <Hidden smDown implementation="css">
            <SweetAlert
              style={{ 
                display: "block", 
                overflow:"scroll", height:"70%", top: "20%",marginTop: 0, 
                width:"800px",
                marginLeft: "-400px",
                }}
              title={"Client Request"}
              showConfirm={false}
              onConfirm={() => this.hideRequestDetailAlert()}
              onCancel={() => this.hideRequestDetailAlert()}
              confirmBtnCssClass={
                this.props.classes.button + " " + this.props.classes.success
              }
            >
            {content}
            </SweetAlert>
          </Hidden>

          <Hidden mdUp implementation="css">
          <SweetAlert
            style={{ 
              display: "block", 
              overflow:"scroll", height:"70%", top: "20%",marginTop: 0,
              }}
            title={"Client Request"}
            showConfirm={false}
            onConfirm={() => this.hideRequestDetailAlert()}
            onCancel={() => this.hideRequestDetailAlert()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
          >
          {content}
          </SweetAlert>
          </Hidden>
        </div>
      )
    });
  }
  hideRequestDetailAlert() {
    this.setState({
      alert: null
    });
  }
  basicEmailAlert = () => {
    const { classes } = this.props;
    console.log(classes)
    this.setState({
      email_alert: (
        <SweetAlert
          style={{ display: "block",overflow:"scroll", height:"70%", top: "20%", marginTop: 0}}
          title={"Send Email"}
          showConfirm={false}
          onConfirm={() => this.hideEmailAlert()}
          onCancel={() => this.hideEmailAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
        <form>
            <CustomInput
                labelText="Email adress"
                id="email_adress"
                formControlProps={{
                fullWidth: true
                }}
                inputProps={{
                type: "email"
                }}
            />
            <div>
                <label
                    htmlFor="simple-select"
                    className={classes.floatLeft}
                    >
                    Email Contents
                </label>
                <textarea style={{width:'100%'}} name="message" rows="10" cols="30">Email Contents.</textarea>
            </div>
            <Button color="rose" onClick={()=>this.hideEmailAlert()}>Submit</Button>
        </form>
        </SweetAlert>
      )
    });
  }
  hideEmailAlert() {
    this.setState({
        email_alert: null
    });
  }
  render() {
    const { classes } = this.props;
    const { toggleSelection, toggleAll, isSelected, logSelection } = this;
    const { data, columns, selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      // getTrProps: (state, rowInfo, column) => {
      //   // someone asked for an example of a background color change
      //   // here it is...
      //   const selected = this.isSelected(rowInfo.original._id);
      //   return {
      //     style: {
      //       backgroundColor: selected ? "lightgreen" : "inherit"
      //       // color: selected ? 'white' : 'inherit',
      //     }
      //   };
      // }
    };
    return (
      <GridContainer>
        {this.state.alert}
        {this.state.email_alert}
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <DateRange />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Registrations</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={10}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.selectedValue === "a"}
                        onChange={this.handleChange}
                        value="a"
                        name="radio button demo"
                        aria-label="A"
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={classes.radioChecked}
                          />
                        }
                        classes={{
                          checked: classes.radio
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="All"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.selectedValue === "b"}
                        onChange={this.handleChange}
                        value="b"
                        name="radio button demo"
                        aria-label="B"
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={classes.radioChecked}
                          />
                        }
                        classes={{
                          checked: classes.radio
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="To Process"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.selectedValue === "c"}
                        onChange={this.handleChange}
                        value="c"
                        name="radio button demo"
                        aria-label="C"
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={classes.radioChecked}
                          />
                        }
                        classes={{
                          checked: classes.radio
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="Processing"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.selectedValue === "d"}
                        onChange={this.handleChange}
                        value="d"
                        name="radio button demo"
                        aria-label="D"
                        icon={
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={classes.radioChecked}
                          />
                        }
                        classes={{
                          checked: classes.radio
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="Processed"
                  />
              </GridItem>
            </GridContainer>
              <div className={classes.right}>
                <Button onClick={this.basicAlert} color="rose">Fees of Selected</Button>
              </div>
              <Clearfix />
              <CheckboxTable
                ref={r => (this.checkboxTable = r)}
                data={data}
                columns={columns}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
                {...checkboxProps}
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => {              
                      this.basicRequestDetailAlert();
                      if (handleOriginal) {
                        handleOriginal();
                      }
                    }
                  };
                }}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ClientRequest);
