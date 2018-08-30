import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import "react-table/react-table.css";
import Chance from "chance";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import matchSorter from 'match-sorter'
import testData from "./test_data";

import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import NotInterested from "@material-ui/icons/NotInterested";
import Close from "@material-ui/icons/Close";
import DateRange from "@material-ui/icons/DateRange";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import { dataTable } from "variables/general.jsx";
import Table from "components/Table/Table.jsx";

// material components
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";

// styles
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const CheckboxTable = checkboxHOC(ReactTable);

const chance = new Chance();


const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  floatRight: {
    float: "right!important"
  },

  ...sweetAlertStyle,
  ...regularFormsStyle,
};

class RegisteredForEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      show: false,
      selectedValue: null,
      selectedEnabled: "b",
      showModal: false,
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
        name: key%2==0?"name1":"name2",
        company: key%2==0?"company1":"company2",
        country: key%2==0?"China":"Japan",
        fee: key%2==0?"200":"800",
        actions: (
          
          // we've added some custom button actions
          <div className="actions-right">
          {/* use this button to add a edit kind of action */}
            <Button
                justIcon
                round
                simple
                onClick={() => {
                  //this.props.history.push("/event-registered")
                }}
                color="warning"
                className="edit"
              >
              <CheckCircleOutline />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
              }}
              color="warning"
              className="edit"
            >
              <NotInterested />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                // var data = this.state.data;
                // data.find((o, i) => {
                //   if (o._id === key) {
                //     // here you should add some custom code so you can delete the data
                //     // from this component and from your server as well
                //     data.splice(i, 1);
                //     return true;
                //   }
                //   return false;
                // });
                // this.setState({ data: data });
              }}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
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
        Header: "Name",
        accessor: "name",
        sortable: true,
        filterable: true,

      },
      {
        Header: "Company",
        accessor: "company",
        sortable: true,
        filterable: true,
      },
      {
        Header: "Country",
        accessor: "country",
        sortable: true,
        filterable: true,
      },
      {
        Header: "Fee",
        accessor: "fee",
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
          title={"Event Name"}
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
                "Host",
                "Ali Lee, Chief Executive Officer",
              ]
            },
            ["Company", "Bank of Shanghai"],
            {
              color: "success",
              data: [
                "Date",
                "Thursday 30th August 2018, 10:00 AM",
              ]
            },
            [
              "Region",
              "China",
            ],
            {
              color: "success",
              data: ["Subject", "5G and China-US relationship"]
            },
            [
              "Minimum Expected Fee",
              "USD 100",
            ],
            {
              color: "success",
              data: [
                "Total Paid Fee So Far",
                "USD 1000",
              ]
            },
            [
              "No.of Times of Over-Subscription",
              "10x",
            ],
            {
              color: "success",
              data: [
                "Broker's Revenue Cut",
                "USD 800",
              ]
            },
            [
              "Actelligent's Revenue Cut",
              "USD 200",
            ],
            {
              color: "success",
              data: [
                "Total No.of Participants",
                "2",
              ]
            },
            [
              "Registered Participants",
              "Charmaine Lo, Pinpoint Asset Management,Vivian Lo, Value Partners",
            ],
          ]}
        />
        <Button onClick = {()=>this.hideAlert()} color="success">Export to Excel</Button>
        <Button onClick = {()=>this.hideAlert()} color="rose">Delete</Button>
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
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
                    label="Approved"
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
                    label="Rejected"
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
                    label="Blocked"
                  />
              </GridItem>
            </GridContainer>
              <div className={classes.floatRight}>
                <Button onClick={this.basicAlert} color="rose">Summary</Button>
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
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(RegisteredForEvents);
