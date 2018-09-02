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



class ClientReply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: [],
    };    
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
        company: key%2==0?"Company1":"Company2",
        fee: key%2==0?"200 USD":"800USD",
        date: (new Date()).toDateString(),
        actions: (
          
          // we've added some custom button actions
          <div className="actions-right">
            {key%2==0 && <Button
                        justIcon
                        onClick={() => {
                        //this.props.history.push("/event-registered")
                        }}
                        color="warning"
                        className="edit"
                    >
                    <Close />
                </Button>
            }
            {key%2==1 && <Button
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
        Header: "Fee",
        accessor: "fee",
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
        Header: "State",
        accessor: "actions",
        sortable: false,
        filterable: false
      }
    ]
    return columns;
  }

  render() {
    const { classes } = this.props;
    const { data, columns } = this.state;

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
              <h4 className={classes.cardIconTitle}>Notification from Actelligent</h4>
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
              <ReactTable
                ref={r => (this.checkboxTable = r)}
                data={data}
                columns={columns}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
                // getTdProps={(state, rowInfo, column, instance) => {
                //   return {
                //     onClick: (e, handleOriginal) => {              
                //       this.basicRequestDetailAlert();
                //       if (handleOriginal) {
                //         handleOriginal();
                //       }
                //     }
                //   };
                // }}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ClientReply);
