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
import Attachment from "@material-ui/icons/Attachment";
import CloudUpload from "@material-ui/icons/CloudUpload";
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

import styles from "./recording.style"

const CheckboxTable = checkboxHOC(ReactTable);

const chance = new Chance();



class Recording extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      summary_alert: null,
      upload_alert: null,
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
        doc:(
          <div>
            {key%2==0 && <Button
              justIcon
              round
              simple
              onClick={() => {
                alert('Will download uploaded record')
              }}
              color="warning"
              className="edit"
            >
              <Attachment />
            </Button>
            }
            {key%2==1 && <Button
              justIcon
              round
              simple
              onClick={() => {
                this.basicAlert();
              }}
              color="warning"
              className="edit"
            >
              <CloudUpload />
            </Button>
            }
          </div>
        ),
        date: (new Date()).toDateString(),
        host: key%2==0?"Host 1":"Host 2",
        speaker: key%2==0?"Speaker 1":"Speaker 2",
        department: key%2==0?"Department 1":"Department 2",
        language: key%2==0?"Chinese":"Japan",
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
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
        Header: "Attachment",
        accessor: "doc",
      },
      {
        Header: "Date",
        accessor: "date",
        sortable: true,
        filterable: true,

      },
      {
        Header: "Host",
        accessor: "host",
        sortable: true,
        filterable: true,
      },
      {
        Header: "Speaker",
        accessor: "speaker",
        sortable: true,
        filterable: true,
      },
      {
        Header: "Department",
        accessor: "department",
        sortable: true,
        filterable: true,
      },
      {
        Header: "Language",
        accessor: "language",
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
    const {classes} = this.props;
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block",overflow:"scroll", height:"70%", top: "20%", marginTop: 0}}
          title={"Recording"}
          showConfirm={false}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
        <form>
                <GridContainer>
                	<GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Upload Date"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Host"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Speaker"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Department"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Language"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Companies Involved"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Themes"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Sectors"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Regions"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <CustomInput
                      labelText="Subject"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        // onChange: event =>
                        //   this.change(event, "loginEmail", "email"),
                        // type: "email"
                      }}
                    />
                    <FormLabel>
                      Please upload recording file
                    </FormLabel>
                    <CustomInput
                      id="email_adress2"
                      formControlProps={{
                        fullWidth: false
                      }}
                      inputProps={{
                        type: "file"
                      }}
                    />
                    <GridContainer>
                      <GridItem xs={12} sm={12}>
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
                          label="Positive"
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
                          label="Neutral"
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
                          label="Negative"
                        />
                    </GridItem>
                  </GridContainer>
                    <Button onClick={()=>this.hideAlert()} color="primary" className={classes.floatRight}>Save</Button>
                  </GridItem>
                </GridContainer>
        </form>
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }

  uploadAlert = () => {
    const {classes} = this.props;
    this.setState({
      upload_alert: (
        <SweetAlert
          style={{ display: "block",overflow:"scroll", height:"40%", top: "20%", marginTop: 0}}
          title={"Recording"}
          showConfirm={false}
          onConfirm={() => this.hideUploadAlert()}
          onCancel={() => this.hideUploadAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
        <form>
                <GridContainer>
                	<GridItem xs={12} sm={12} md={12}>
                    <FormLabel>
                      Please upload recording file
                    </FormLabel>
                    <CustomInput
                      id="email_adress2"
                      formControlProps={{
                        fullWidth: false
                      }}
                      inputProps={{
                        type: "file"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button onClick={()=>this.hideUploadAlert()} color="primary">Save</Button>
                  </GridItem>
                </GridContainer>
        </form>
        </SweetAlert>
      )
    });
  }
  hideUploadAlert() {
    this.setState({
      upload_alert: null
    });
  }
  basicSummary = () => {
    this.setState({
      summary_alert: (
        <SweetAlert
          style={{ display: "block",overflow:"scroll", height:"70%", top: "20%", marginTop: 0}}
          title={"Event Name"}
          showConfirm={true}
          onConfirm={() => this.hidebasicSummary()}
          onCancel={() => this.hidebasicSummary()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
        <Table
          hover
          tableHead={["Unit", "Price", "No. Sold", "Total Revenue"]}
          className={this.props.classes.modalStyle}
          tableData={[
            {
              color: "success",
              data: [
                "Recording 1",
                "USD 80",
                "10",
                "USD 800"
              ]
            },
            [ "Recording 1","USD 80","10","USD 800" ],
            {
              color: "success",
              data: [
                "Recording 1",
                "USD 80",
                "10",
                "USD 800"
              ]
            },
            [ "Recording 1","USD 80","10","USD 800" ],
            {
              color: "success",
              data: [
                "Recording 1",
                "USD 80",
                "10",
                "USD 800"
              ]
            },
            [ "Recording 1","USD 80","10","USD 800" ],
            {
              color: "danger",
              data: [
                "Total Broker's Revenue",
                "",
                "",
                "USD 1800",
              ]
            },,
            {
              color: "danger",
              data: [
                "Total Actelligent's Revenue",
                "",
                "",
                "USD 90",
              ]
            },
          ]}
        />
        </SweetAlert>
      )
    });
  }
  hidebasicSummary() {
    this.setState({
      summary_alert: null
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
        {this.state.summary_alert}
        {this.state.upload_alert}
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <DateRange />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Recordings</h4>
            </CardHeader>
            <CardBody>
              <div className={classes.right}>
                <Button onClick={()=>this.uploadAlert()} color="rose">Upload Summary</Button>
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

              <div className={classes.right}>
                <Button onClick={()=>this.basicSummary()} color="rose">Monthly Summary</Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Recording);
