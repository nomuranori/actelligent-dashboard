import React from "react";
import Datetime from "react-datetime";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import DateRange from "@material-ui/icons/DateRange";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// style for this view
import eventNewStyle from "assets/jss/material-dashboard-pro-react/views/eventNewStyle.jsx";

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // login form
      loginEmail: "",
      loginEmailState: "",
      loginPassword: "",
      loginPasswordState: "",
      simpleSelect: "",
      simpleSelect1: "",
      simpleSelect2: "",
      simpleSelect3: "",
    };
    
    this.loginClick = this.loginClick.bind(this);
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }
  // function that verifies if value contains only numbers
  verifyNumber(value) {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }
  // verifies if value is a valid URL
  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }
  loginClick() {
    if (this.state.loginEmailState === "") {
      this.setState({ loginEmailState: "error" });
    }
    if (this.state.loginPasswordState === "") {
      this.setState({ loginPasswordState: "error" });
    }
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    console.log(classes)
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <DateRange />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Edit Event</h4>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                	<GridItem xs={6} sm={12} md={6}>
                    <CustomInput
                      success={this.state.loginEmailState === "success"}
                      error={this.state.loginEmailState === "error"}
                      labelText="Title *"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "loginEmail", "email"),
                        type: "email"
                      }}
                    />
                    <CustomInput
                      success={this.state.loginEmailState === "success"}
                      error={this.state.loginEmailState === "error"}
                      labelText="Event Name *"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "loginEmail", "email"),
                        type: "email"
                      }}
                    />
                    
                    <CustomInput
                      success={this.state.loginPasswordState === "success"}
                      error={this.state.loginPasswordState === "error"}
                      labelText="Entity Name *"
                      id="loginpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "loginPassword", "password"),
                      }}
                    />
                    <CustomInput
                      success={this.state.loginEmailState === "success"}
                      error={this.state.loginEmailState === "error"}
                      labelText="Speaker Name *"
                      id="loginemail"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "loginEmail", "email"),
                        type: "email"
                      }}
                    />
                    <CustomInput
                      success={this.state.loginPasswordState === "success"}
                      error={this.state.loginPasswordState === "error"}
                      labelText="Related Themes *"
                      id="loginpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "loginPassword", "password"),
                      }}
                    />
                    <CustomInput
                      success={this.state.loginPasswordState === "success"}
                      error={this.state.loginPasswordState === "error"}
                      labelText="Max Participant"
                      id="loginpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "loginPassword", "password"),
                          type: "number"
                      }}
                    />
                    <CustomInput
                      success={this.state.loginPasswordState === "success"}
                      error={this.state.loginPasswordState === "error"}
                      labelText="Related Themes"
                      id="loginpassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "loginPassword", "password"),
                          type: "number"
                      }}
                    />
                	</GridItem>
                  <GridItem xs={6} sm={12} md={6}>
                    <div>
                      <InputLabel className={classes.label}>Event Date</InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          inputProps={{ placeholder: "Date" }}
                        />
                      </FormControl>
                    </div>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Language
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.simpleSelect}
                        onChange={this.handleSimple}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="18"
                        >
                          English
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="19"
                        >
                          Chinese
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="20"
                        >
                          Japanese
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Region
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.simpleSelect1}
                        onChange={this.handleSimple}
                        inputProps={{
                          name: "simpleSelect1",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="United State"
                        >
                          United State
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="China"
                        >
                          China
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="Japan"
                        >
                          Japan
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Sector
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.simpleSelect2}
                        onChange={this.handleSimple}
                        inputProps={{
                          name: "simpleSelect2",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="Sector1"
                        >
                          Sector1
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="Sector2"
                        >
                          Sector2
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="Sector3"
                        >
                          Sector3
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Event Type
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.simpleSelect3}
                        onChange={this.handleSimple}
                        inputProps={{
                          name: "simpleSelect3",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="Broker Event"
                        >
                          Broker Event
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="Corporate Event"
                        >
                          Corporate Event
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <GridContainer>
                      <GridItem md={6}>
                        <FormLabel className={classes.labelHorizontal}>
                          Do you have excel file to upload?
                        </FormLabel>
                      </GridItem>
                      <GridItem md={6}>
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
                    </GridContainer>
                	</GridItem>
                </GridContainer>
                
                <div className={classes.center}>
                  <Button href="/event" color="rose" onClick={this.loginClick}>
                    SAVE
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        
      </GridContainer>
    );
  }
}

export default withStyles(eventNewStyle)(EditEvent);
