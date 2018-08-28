import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

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

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  right: {
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
      
      data: dataTable.dataRows.map((prop, key) => {
        return {
          id: key,
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
                    let obj = this.state.data.find(o => o.id === key);
                    this.props.history.push("/event-registered");
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
                  let obj = this.state.data.find(o => o.id === key);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                      obj.name +
                      ", \nposition: " +
                      obj.position +
                      ", \noffice: " +
                      obj.office +
                      ", \nage: " +
                      obj.age +
                      "\n}."
                  );
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
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
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
    };    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this)
  }
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
          style={{ display: "block",width:"auto",overflow:"scroll", height:"70%", top: "20%", marginTop: 0}}
          title={null}
          showConfirm={false}
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
              <div className={classes.right}>
                <Button onClick={this.basicAlert} color="rose">Summary</Button>
              </div>
              <Clearfix />
              <ReactTable
                getTrProps={(state, rowInfo) => {
                  return {
                    onClick: (e) => {
                      this.setState({
                        selected: rowInfo.index
                      })
                    },
                    style: {
                      background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                      color: rowInfo.index === this.state.selected ? 'white' : 'black'
                    }
                  }
                }}
                data={this.state.data}
                filterable
                columns={[
                  {
                    Header: "No",
                    accessor: "id",
                    sortable: true,
                    filterable: false
                  },
                  {
                    Header: "Name",
                    accessor: "name",
                    sortable: true,
                    filterable: true
                  },
                  {
                    Header: "Company",
                    accessor: "company",
                    sortable: true,
                    filterable: true
                  },
                  {
                    Header: "Country",
                    accessor: "country",
                    sortable: true,
                    filterable: true
                  },
                  {
                    Header: "Fee",
                    accessor: "fee",
                    sortable: true,
                    filterable: true
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(RegisteredForEvents);
