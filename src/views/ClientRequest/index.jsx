import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import "react-table/react-table.css";
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Reorder from "@material-ui/icons/Reorder";
import Create from "@material-ui/icons/Create";
import Close from "@material-ui/icons/Close";
import Build from "@material-ui/icons/Build";
import DateRange from "@material-ui/icons/DateRange";
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

import styles from "./index.style";

class ClientRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      show: false,
      data: dataTable.dataRows.map((prop, key) => {
        return {
          id: key,
          name: prop[0],
          date: (new Date()).toDateString(),
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
                    
                  }}
                  color="warning"
                  className="build"
                >
                <Build />
              </Button>{" "}
            </div>
          )
        };
      })
    };
  }
  basicAlert = () => {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block",overflow:"scroll", height:"70%", top: "20%", marginTop: 0}}
          title={"Fee of requests"}
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
              <h4 className={classes.cardIconTitle}>Event Table</h4>
            </CardHeader>
            <CardBody>
              <div className={classes.right}>
                <Button href="/event-edit" color="rose">Fee of Selected</Button>
              </div>
              <Clearfix />
              <ReactTable
                getTrProps={(state, rowInfo) => {
                  return {
                    onClick: (e) => {
                      this.basicAlert();
                      this.setState({
                        selected: rowInfo.index
                      })
                    },
                  }
                }}
                data={this.state.data}
                filterable
                columns={[
                  {
                    Header: "No",
                    accessor: "id",
                    sortable: false,
                    filterable: false
                  },
                  {
                    Header: "Name",
                    accessor: "name"
                  },
                  {
                    Header: "Date",
                    accessor: "date"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false,
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

export default withStyles(styles)(ClientRequest);
