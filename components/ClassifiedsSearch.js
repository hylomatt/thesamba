import React, { useState } from 'react'
import range from 'lodash/range'
// import uniq from 'lodash/uniq'
import { format } from 'date-fns'

import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  // List,
  // ListItem,
  ListItemText,
  // Hidden,
  // IconButton,
  // Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Input,
  OutlinedInput,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  Checkbox
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import SearchIcon from '@material-ui/icons/Search'
import { withStyles } from '@material-ui/core/styles'

export default withStyles((theme) => ({
  halfWidth: {
    width: '50%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))(({ open, setOpen, classes }) => {
  const handleSearch = () => {
    setOpen(false)
    return true
  }

  const searchModels = [
    { value: 'All', title: 'All' },
    { value: 'Bug - Split Window - Sedan', title: 'Bug - Split Window - Sedan' },
    { value: 'Bug - Split Window - Ragtop', title: 'Bug - Split Window - Ragtop' },
    { value: 'Bug - Split Window - Convertible', title: 'Bug - Split Window - Convertible' },
    { value: 'Bug - Oval Window - Sedan', title: 'Bug - Oval Window - Sedan' },
    { value: 'Bug - Oval Window - Ragtop', title: 'Bug - Oval Window - Ragtop' },
    { value: 'Bug - Oval Window - Convertible', title: 'Bug - Oval Window - Convertible' },
    { value: 'Bug - Sedan', title: 'Bug - Sedan' },
    { value: 'Bug - Sunroof', title: 'Bug - Sunroof' },
    { value: 'Bug - Convertible', title: 'Bug - Convertible' },
    { value: 'Bug - Other', title: 'Bug - Other' },
    { value: 'Super Beetle - Sedan', title: 'Super Beetle - Sedan' },
    { value: 'Super Beetle - Sunroof', title: 'Super Beetle - Sunroof' },
    { value: 'Super Beetle - Convertible', title: 'Super Beetle - Convertible' },
    { value: 'Brazilian Split Bus - All Years', title: 'Brazilian Split Bus - All Years' },
    { value: '1949-67 Bus - Panel', title: '1949-67 Bus - Panel' },
    { value: '1949-67 Bus - Kombi', title: '1949-67 Bus - Kombi' },
    { value: '1949-67 Bus - Standard/Microbus', title: '1949-67 Bus - Standard/Microbus' },
    { value: '1949-67 Bus - Deluxe', title: '1949-67 Bus - Deluxe' },
    { value: '1949-67 Bus - Camper', title: '1949-67 Bus - Camper' },
    { value: '1949-67 Bus - Special Model', title: '1949-67 Bus - Special Model' },
    { value: '1949-67 Bus - Single Cab', title: '1949-67 Bus - Single Cab' },
    { value: '1949-67 Bus - Double Cab', title: '1949-67 Bus - Double Cab' },
    { value: '1949-67 Bus - Other', title: '1949-67 Bus - Other' },
    { value: '1968-79 Bus - Panel', title: '1968-79 Bus - Panel' },
    { value: '1968-79 Bus - Kombi/Standard', title: '1968-79 Bus - Kombi/Standard' },
    { value: '1968-79 Bus - Deluxe', title: '1968-79 Bus - Deluxe' },
    { value: '1968-79 Bus - Camper', title: '1968-79 Bus - Camper' },
    { value: '1968-79 Bus - Special Model', title: '1968-79 Bus - Special Model' },
    { value: '1968-79 Bus - Single Cab', title: '1968-79 Bus - Single Cab' },
    { value: '1968-79 Bus - Double Cab', title: '1968-79 Bus - Double Cab' },
    { value: '1968-79 Bus - Other', title: '1968-79 Bus - Other' },
    { value: '1980-up Bus - Vanagon - All', title: '1980-up Bus - Vanagon - All' },
    { value: '1991-up Bus - Eurovan - All', title: '1991-up Bus - Eurovan - All' },
    { value: 'Ghia - Coupe', title: 'Ghia - Coupe' },
    { value: 'Ghia - Convertible', title: 'Ghia - Convertible' },
    { value: 'Type 3 - Fastback', title: 'Type 3 - Fastback' },
    { value: 'Type 3 - Notchback', title: 'Type 3 - Notchback' },
    { value: 'Type 3 - Squareback', title: 'Type 3 - Squareback' },
    { value: 'Type 3 - Type 34', title: 'Type 3 - Type 34' },
    { value: 'Type 3 - Special Model', title: 'Type 3 - Special Model' },
    { value: 'Type 3 - Other', title: 'Type 3 - Other' },
    { value: 'Type 4 - 411', title: 'Type 4 - 411' },
    { value: 'Type 4 - 412', title: 'Type 4 - 412' },
    { value: 'Thing', title: 'Thing' },
    { value: '356 - Pre-A (50-55)', title: '356 - Pre-A (50-55)' },
    { value: '356 - A (56-59)', title: '356 - A (56-59)' },
    { value: '356 - B T-5 (60-61)', title: '356 - B T-5 (60-61)' },
    { value: '356 - B T-6 (62-63)', title: '356 - B T-6 (62-63)' },
    { value: '356 - C T-6 (64-65)', title: '356 - C T-6 (64-65)' },
    { value: '911/912', title: '911/912' },
    { value: '914', title: '914' },
    { value: 'Water-cooled VW', title: 'Water-cooled VW' },
    { value: 'Other VW vehicle', title: 'Other VW vehicle ' }
  ]

  const searchCategories = [
    { value: '', title: 'All' },
    { value: '65', title: 'Vehicles - Type 1/Bug - through 1957' },
    { value: '1', title: 'Vehicles - Type 1/Bug - 1958-67' },
    { value: '3', title: 'Vehicles - Type 1/Bug - 1968-up' },
    { value: '5', title: 'Vehicles - Type 2/Bus - 1949-67' },
    { value: '77', title: 'Vehicles - Type 2/Bus - Brazilian' },
    { value: '7', title: 'Vehicles - Type 2/Bus - Bay Window - 1968-79' },
    { value: '55', title: 'Vehicles - Type 2/Bus - Vanagon' },
    { value: '75', title: 'Vehicles - Type 2/Bus - Eurovan-up' },
    { value: '9', title: 'Vehicles - Type 3' },
    { value: '11', title: 'Vehicles - Type 4 - 411/412' },
    { value: '13', title: 'Vehicles - Ghia' },
    { value: '15', title: 'Vehicles - Thing/Type 181' },
    { value: '17', title: 'Vehicles - Off Road' },
    { value: '68', title: 'Vehicles - Race/Drag Vehicles' },
    { value: '19', title: 'Vehicles - Other VW/Porsche Vehicles' },
    { value: '63', title: 'Vehicles - Water-cooled VW/Porsches - 1974-up' },
    { value: '59', title: 'Vehicles - Porsche - 356' },
    { value: '73', title: 'Vehicles - Porsche - 911/912/914' },
    { value: '21', title: 'Parts - General Parts' },
    { value: '23', title: 'Parts - High Performance/Engine' },
    { value: '25', title: 'Parts - Wheels/Tires' },
    { value: '64', title: 'Parts - Type 1/Bug - through 1957' },
    { value: '27', title: 'Parts - Type 1/Bug - 1958-67' },
    { value: '29', title: 'Parts - Type 1/Bug - 1968-up' },
    { value: '31', title: 'Parts - Type 2/Bus - 1949-67' },
    { value: '33', title: 'Parts - Type 2/Bus - Bay Window - 1968-79' },
    { value: '57', title: 'Parts - Type 2/Bus - Vanagon' },
    { value: '76', title: 'Parts - Type 2/Bus - Eurovan-up' },
    { value: '35', title: 'Parts - Type 3' },
    { value: '37', title: 'Parts - Type 4 - 411/412' },
    { value: '39', title: 'Parts - Ghia' },
    { value: '41', title: 'Parts - Thing/Type 181' },
    { value: '66', title: 'Parts - Off Road' },
    { value: '67', title: 'Parts - Water-cooled' },
    { value: '61', title: 'Parts - Porsche - 356' },
    { value: '74', title: 'Parts - Porsche - 911/912/914' },
    { value: '70', title: 'Vendors - New Parts - General Parts' },
    { value: '72', title: 'Vendors - New Parts - Off-Road' },
    { value: '69', title: 'Vendors - New Parts - High Performance/Engine' },
    { value: '71', title: 'Vendors - New Parts - Accessories' },
    { value: '45', title: 'Other - Literature/Manuals' },
    { value: '47', title: 'Other - Toys' },
    { value: '49', title: 'Other - Services' },
    { value: '51', title: 'Other - Other VW/Porsche Related' },
    { value: '53', title: 'Other - eBay Ads' },
    { value: '54', title: 'Other - Trades - VW-Related' }
  ]

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  const [selectedModels, setSelectedModels] = useState(['All'])
  const [selectedCategories, setSelectedCategories] = useState(['All'])

  const handleModelChange = (event) => {
    const value = event.target.value.length ? event.target.value.slice(-1)[0] : 'All'
    setSelectedModels((oldValues) => {
      let newValues = []
      if (oldValues.includes(value)) {
        newValues = oldValues.filter((el) => el !== value)
      } else {
        newValues = [...oldValues, value]
      }
      if (value === 'All') {
        newValues = ['All']
      } else {
        newValues = newValues.filter((el) => el !== 'All')
      }
      return newValues
    })
  }

  const handleCategoryChange = (event) => {
    const value = event.target.value.length ? event.target.value.slice(-1)[0] : 'All'
    setSelectedCategories((oldValues) => {
      let newValues = []
      if (oldValues.includes(value)) {
        newValues = oldValues.filter((el) => el !== value)
      } else {
        newValues = [...oldValues, value]
      }
      if (value === 'All') {
        newValues = ['All']
      } else {
        newValues = newValues.filter((el) => el !== 'All')
      }
      return newValues
    })
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Search Criteria</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Tips:</strong> Use * as a wildcard for partial matches, e.g. sema* would find all ads with semaphore.
        </DialogContentText>

        <form method="get" action="search.php" id="search-form">
          <input type="hidden" name="submit" value="yes" />
          <TextField autoFocus margin="dense" name="keywords" label="Find" type="text" fullWidth variant="outlined" maxLength="50" />
          <Grid container>
            <Grid item xs={6} style={{ paddingRight: '4px' }}>
              <TextField select margin="dense" name="type" label="Search" value="text" variant="outlined" fullWidth>
                <MenuItem value="text">Title only</MenuItem>
                <MenuItem value="both">Title and Description</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: '4px' }}>
              <TextField select margin="dense" name="stype" label="Search Type" value="all" variant="outlined" fullWidth>
                <MenuItem value="all">Find all</MenuItem>
                <MenuItem value="any">Find any</MenuItem>
                <MenuItem value="phrase">Find exact phrase</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <TextField margin="dense" name="username" label="Username/Email" type="text" fullWidth variant="outlined" maxLength="50" />
          <FormGroup>
            <b>Years:&nbsp;</b>
            <Grid container>
              <Grid item xs={6} style={{ paddingRight: '4px' }}>
                <TextField select margin="dense" name="yearfrom" label="From" variant="outlined" fullWidth>
                  <MenuItem>All</MenuItem>
                  {range(1939, format(new Date(), 'yyyy')).map((yr, i) => (
                    <MenuItem key={`search-year-from-${i}`} value={yr}>
                      {yr}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: '4px' }}>
                <TextField select margin="dense" name="yearto" label="To" variant="outlined" fullWidth>
                  <MenuItem>All</MenuItem>
                  {range(1939, format(new Date(), 'yyyy')).map((yr, i) => (
                    <MenuItem key={`search-year-to-${i}`} value={yr}>
                      {yr}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </FormGroup>
          <FormGroup>
            <b>Price:&nbsp;</b>
            <Grid container>
              <Grid item xs={6} style={{ paddingRight: '4px' }}>
                <TextField margin="dense" name="pricefrom" label="From" type="text" fullWidth variant="outlined" maxLength="10" />
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: '4px' }}>
                <TextField margin="dense" name="priceto" label="To" type="text" fullWidth variant="outlined" maxLength="10" />
              </Grid>
            </Grid>
          </FormGroup>
          <FormControl margin="dense" variant="outlined" fullWidth>
            <InputLabel id="search-models-label">Models</InputLabel>
            <Select
              labelId="search-models-label"
              multiple
              value={selectedModels}
              onChange={handleModelChange}
              input={<OutlinedInput labelWidth={45} />}
              renderValue={(selected) => (selected.length && selected[0] === 'All' ? 'All' : `${selected.length} selected`)}
              MenuProps={MenuProps}
            >
              {searchModels.map((model) => (
                <MenuItem key={model.title} value={model.value}>
                  <Checkbox checked={selectedModels.includes(model.value)} />
                  <ListItemText primary={model.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin="dense" variant="outlined" fullWidth>
            <InputLabel id="search-cats-label">Categories</InputLabel>
            <Select
              labelId="search-cats-label"
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              input={<OutlinedInput labelWidth={70} />}
              renderValue={(selected) => (selected.length && selected[0] === 'All' ? 'All' : `${selected.length} selected`)}
              MenuProps={MenuProps}
            >
              {searchCategories.map((cat) => (
                <MenuItem key={cat.title} value={cat.value}>
                  <Checkbox checked={selectedCategories.includes(cat.value)} />
                  <ListItemText primary={cat.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField select margin="dense" name="wanted" label="Wanted Ads" variant="outlined" fullWidth defaultValue="show">
            <MenuItem value="show">Show wanted ads</MenuItem>
            <MenuItem value="hide">Hide wanted ads</MenuItem>
            <MenuItem value="only">Wanted ads only</MenuItem>
          </TextField>

          <br />
          <br />

          <Accordion square={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Optional Location Criteria</Typography>
            </AccordionSummary>
            <AccordionDetails direction="column">
              <Box width="100%">
                <strong>
                  <u>USA/Canada</u>
                </strong>
                <br />
                <br />
                <FormGroup>
                  <b>Zip/Distance:&nbsp;</b>
                  <TextField margin="dense" name="zip" label="Zip" type="text" variant="outlined" maxLength="5" autoComplete="off" />
                  <TextField select margin="dense" name="zipdist" label="Distance" variant="outlined" defaultValue="0">
                    <MenuItem value="0">Exact Zip</MenuItem>
                    <MenuItem value="10">Within 10 miles</MenuItem>
                    <MenuItem value="25">Within 25 miles</MenuItem>
                    <MenuItem value="50">Within 50 miles</MenuItem>
                    <MenuItem value="75">Within 75 miles</MenuItem>
                    <MenuItem value="100">Within 100 miles</MenuItem>
                    <MenuItem value="200">Within 200 miles</MenuItem>
                    <MenuItem value="250">Within 250 miles</MenuItem>
                    <MenuItem value="300">Within 300 miles</MenuItem>
                    <MenuItem value="400">Within 400 miles</MenuItem>
                    <MenuItem value="500">Within 500 miles </MenuItem>
                  </TextField>
                </FormGroup>
                <b>OR</b>
                <br />
                <TextField select margin="dense" name="state[]" label="State/Province" variant="outlined" autoComplete="off" fullWidth>
                  <MenuItem>All</MenuItem>
                  <MenuItem value="Outside the USA">Outside the USA</MenuItem>
                  <MenuItem value="Alabama">Alabama</MenuItem>
                  <MenuItem value="Alaska">Alaska</MenuItem>
                  <MenuItem value="American Samoa">American Samoa</MenuItem>
                  <MenuItem value="Arizona">Arizona</MenuItem>
                  <MenuItem value="Arkansas">Arkansas</MenuItem>
                  <MenuItem value="California">California</MenuItem>
                  <MenuItem value="Colorado">Colorado</MenuItem>
                  <MenuItem value="Connecticut">Connecticut</MenuItem>
                  <MenuItem value="Delaware">Delaware</MenuItem>
                  <MenuItem value="District of Columbia">District of Columbia</MenuItem>
                  <MenuItem value="Federated States Miconesia">Federated States Miconesia</MenuItem>
                  <MenuItem value="Florida">Florida</MenuItem>
                  <MenuItem value="Georgia">Georgia</MenuItem>
                  <MenuItem value="Guam">Guam</MenuItem>
                  <MenuItem value="Hawaii">Hawaii</MenuItem>
                  <MenuItem value="Idaho">Idaho</MenuItem>
                  <MenuItem value="Illinois">Illinois</MenuItem>
                  <MenuItem value="Indiana">Indiana</MenuItem>
                  <MenuItem value="Iowa">Iowa</MenuItem>
                  <MenuItem value="Kansas">Kansas</MenuItem>
                  <MenuItem value="Kentucky">Kentucky</MenuItem>
                  <MenuItem value="Louisiana">Louisiana</MenuItem>
                  <MenuItem value="Maine">Maine</MenuItem>
                  <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                  <MenuItem value="Maryland">Maryland</MenuItem>
                  <MenuItem value="Massachusetts">Massachusetts</MenuItem>
                  <MenuItem value="Michigan">Michigan</MenuItem>
                  <MenuItem value="Minnesota">Minnesota</MenuItem>
                  <MenuItem value="Mississippi">Mississippi</MenuItem>
                  <MenuItem value="Missouri">Missouri</MenuItem>
                  <MenuItem value="Montana">Montana</MenuItem>
                  <MenuItem value="Nebraska">Nebraska</MenuItem>
                  <MenuItem value="Nevada">Nevada</MenuItem>
                  <MenuItem value="New Hampshire">New Hampshire</MenuItem>
                  <MenuItem value="New Jersey">New Jersey</MenuItem>
                  <MenuItem value="New Mexico">New Mexico</MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="North Carolina">North Carolina</MenuItem>
                  <MenuItem value="North Dakota">North Dakota</MenuItem>
                  <MenuItem value="Northern Mariana Islands">Northern Mariana Islands</MenuItem>
                  <MenuItem value="Ohio">Ohio</MenuItem>
                  <MenuItem value="Oklahoma">Oklahoma</MenuItem>
                  <MenuItem value="Oregon">Oregon</MenuItem>
                  <MenuItem value="Palau Island">Palau Island</MenuItem>
                  <MenuItem value="Pennsylvania">Pennsylvania</MenuItem>
                  <MenuItem value="Puerto Rico">Puerto Rico</MenuItem>
                  <MenuItem value="Rhode Island">Rhode Island</MenuItem>
                  <MenuItem value="South Carolina">South Carolina</MenuItem>
                  <MenuItem value="South Dakota">South Dakota</MenuItem>
                  <MenuItem value="Tennessee">Tennessee</MenuItem>
                  <MenuItem value="Texas">Texas</MenuItem>
                  <MenuItem value="Utah">Utah</MenuItem>
                  <MenuItem value="Vermont">Vermont</MenuItem>
                  <MenuItem value="Virgin Islands">Virgin Islands</MenuItem>
                  <MenuItem value="Virginia">Virginia</MenuItem>
                  <MenuItem value="Washington">Washington</MenuItem>
                  <MenuItem value="West Virginia">West Virginia</MenuItem>
                  <MenuItem value="Wisconsin">Wisconsin</MenuItem>
                  <MenuItem value="Wyoming">Wyoming</MenuItem>
                  <MenuItem value="">------------</MenuItem>
                  <MenuItem value="Alberta">Alberta</MenuItem>
                  <MenuItem value="British Columbia">British Columbia</MenuItem>
                  <MenuItem value="Manitoba">Manitoba</MenuItem>
                  <MenuItem value="New Brunswick">New Brunswick</MenuItem>
                  <MenuItem value="Newfoundland">Newfoundland</MenuItem>
                  <MenuItem value="Northwest Territories">Northwest Territories</MenuItem>
                  <MenuItem value="Nova Scotia">Nova Scotia</MenuItem>
                  <MenuItem value="Nunavut">Nunavut</MenuItem>
                  <MenuItem value="Ontario">Ontario</MenuItem>
                  <MenuItem value="Prince Edward Island">Prince Edward Island</MenuItem>
                  <MenuItem value="Quebec">Quebec</MenuItem>
                  <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
                  <MenuItem value="Yukon Territory">Yukon Territory</MenuItem>
                </TextField>
                <b>OR</b>
                <br />
                <TextField select margin="dense" name="usaregion" label="Region" variant="outlined" autoComplete="off" fullWidth>
                  <MenuItem>All</MenuItem>
                  <MenuItem value="Northeast">Northeast</MenuItem>
                  <MenuItem value="Mid-Atlantic">Mid-Atlantic</MenuItem>
                  <MenuItem value="Southeast">Southeast</MenuItem>
                  <MenuItem value="Great Lakes">Great Lakes</MenuItem>
                  <MenuItem value="Midwest">Midwest</MenuItem>
                  <MenuItem value="Plains">Plains</MenuItem>
                  <MenuItem value="Rockies">Rockies</MenuItem>
                  <MenuItem value="Southwest">Southwest</MenuItem>
                  <MenuItem value="Northwest">Northwest</MenuItem>
                  <MenuItem value="Western">Western</MenuItem>
                  <MenuItem value="Pacific">Pacific</MenuItem>
                  <MenuItem value="Caribbean">Caribbean</MenuItem>
                  <MenuItem value="Partial Gulf Coast">Partial Gulf Coast</MenuItem>
                  <MenuItem value="">------------------</MenuItem>
                  <MenuItem value="Europe">Europe </MenuItem>
                </TextField>
                <b>OR</b>
                <br />
                <TextField select margin="dense" name="country" label="Country" variant="outlined" autoComplete="off" fullWidth>
                  <MenuItem>All</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Albania">Albania</MenuItem>
                  <MenuItem value="Algeria">Algeria</MenuItem>
                  <MenuItem value="American Samoa">American Samoa</MenuItem>
                  <MenuItem value="Andorra">Andorra</MenuItem>
                  <MenuItem value="Anguilla">Anguilla</MenuItem>
                  <MenuItem value="Antigua and Barbuda">Antigua and Barbuda</MenuItem>
                  <MenuItem value="Argentina">Argentina</MenuItem>
                  <MenuItem value="Armenia">Armenia</MenuItem>
                  <MenuItem value="Aruba">Aruba</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="Austria">Austria</MenuItem>
                  <MenuItem value="Azerbaijan Republic">Azerbaijan Republic</MenuItem>
                  <MenuItem value="Bahamas">Bahamas</MenuItem>
                  <MenuItem value="Bahrain">Bahrain</MenuItem>
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                  <MenuItem value="Barbados">Barbados</MenuItem>
                  <MenuItem value="Belarus">Belarus</MenuItem>
                  <MenuItem value="Belgium">Belgium</MenuItem>
                  <MenuItem value="Belize">Belize</MenuItem>
                  <MenuItem value="Benin">Benin</MenuItem>
                  <MenuItem value="Bermuda">Bermuda</MenuItem>
                  <MenuItem value="Bhutan">Bhutan</MenuItem>
                  <MenuItem value="Bolivia">Bolivia</MenuItem>
                  <MenuItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</MenuItem>
                  <MenuItem value="Botswana">Botswana</MenuItem>
                  <MenuItem value="Brazil">Brazil</MenuItem>
                  <MenuItem value="British Virgin Islands">British Virgin Islands</MenuItem>
                  <MenuItem value="Brunei Darussalam">Brunei Darussalam</MenuItem>
                  <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                  <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                  <MenuItem value="Burundi">Burundi</MenuItem>
                  <MenuItem value="Cambodia">Cambodia</MenuItem>
                  <MenuItem value="Cameroon">Cameroon</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Cape Verde Islands">Cape Verde Islands</MenuItem>
                  <MenuItem value="Cayman Islands">Cayman Islands</MenuItem>
                  <MenuItem value="Central African Republic">Central African Republic</MenuItem>
                  <MenuItem value="Chad">Chad</MenuItem>
                  <MenuItem value="Chile">Chile</MenuItem>
                  <MenuItem value="China">China</MenuItem>
                  <MenuItem value="Colombia">Colombia</MenuItem>
                  <MenuItem value="Comoros">Comoros</MenuItem>
                  <MenuItem value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</MenuItem>
                  <MenuItem value="Congo, Republic of the">Congo, Republic of the</MenuItem>
                  <MenuItem value="Cook Islands">Cook Islands</MenuItem>
                  <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                  <MenuItem value="Cote d Ivoire (Ivory Coast)">Cote d Ivoire (Ivory Coast)</MenuItem>
                  <MenuItem value="Croatia, Republic of">Croatia, Republic of</MenuItem>
                  <MenuItem value="Cyprus">Cyprus</MenuItem>
                  <MenuItem value="Czech Republic">Czech Republic</MenuItem>
                  <MenuItem value="Denmark">Denmark</MenuItem>
                  <MenuItem value="Djibouti">Djibouti</MenuItem>
                  <MenuItem value="Dominica">Dominica</MenuItem>
                  <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
                  <MenuItem value="Ecuador">Ecuador</MenuItem>
                  <MenuItem value="Egypt">Egypt</MenuItem>
                  <MenuItem value="El Salvador">El Salvador</MenuItem>
                  <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
                  <MenuItem value="Eritrea">Eritrea</MenuItem>
                  <MenuItem value="Estonia">Estonia</MenuItem>
                  <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                  <MenuItem value="Falkland Islands (Islas Malvinas)">Falkland Islands (Islas Malvinas)</MenuItem>
                  <MenuItem value="Fiji">Fiji</MenuItem>
                  <MenuItem value="Finland">Finland</MenuItem>
                  <MenuItem value="France">France</MenuItem>
                  <MenuItem value="French Guiana">French Guiana</MenuItem>
                  <MenuItem value="French Polynesia">French Polynesia</MenuItem>
                  <MenuItem value="Gabon Republic">Gabon Republic</MenuItem>
                  <MenuItem value="Gambia">Gambia</MenuItem>
                  <MenuItem value="Georgia">Georgia</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                  <MenuItem value="Ghana">Ghana</MenuItem>
                  <MenuItem value="Gibraltar">Gibraltar</MenuItem>
                  <MenuItem value="Greece">Greece</MenuItem>
                  <MenuItem value="Greenland">Greenland</MenuItem>
                  <MenuItem value="Grenada">Grenada</MenuItem>
                  <MenuItem value="Guadeloupe">Guadeloupe</MenuItem>
                  <MenuItem value="Guam">Guam</MenuItem>
                  <MenuItem value="Guatemala">Guatemala</MenuItem>
                  <MenuItem value="Guernsey">Guernsey</MenuItem>
                  <MenuItem value="Guinea">Guinea</MenuItem>
                  <MenuItem value="Guinea-Bissau">Guinea-Bissau</MenuItem>
                  <MenuItem value="Guyana">Guyana</MenuItem>
                  <MenuItem value="Haiti">Haiti</MenuItem>
                  <MenuItem value="Honduras">Honduras</MenuItem>
                  <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                  <MenuItem value="Hungary">Hungary</MenuItem>
                  <MenuItem value="Iceland">Iceland</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Indonesia">Indonesia</MenuItem>
                  <MenuItem value="Iran">Iran</MenuItem>
                  <MenuItem value="Ireland">Ireland</MenuItem>
                  <MenuItem value="Israel">Israel</MenuItem>
                  <MenuItem value="Italy">Italy</MenuItem>
                  <MenuItem value="Jamaica">Jamaica</MenuItem>
                  <MenuItem value="Jan Mayen">Jan Mayen</MenuItem>
                  <MenuItem value="Japan">Japan</MenuItem>
                  <MenuItem value="Jersey">Jersey</MenuItem>
                  <MenuItem value="Jordan">Jordan</MenuItem>
                  <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                  <MenuItem value="Kenya Coast Republic">Kenya Coast Republic</MenuItem>
                  <MenuItem value="Kiribati">Kiribati</MenuItem>
                  <MenuItem value="Korea, South">Korea, South</MenuItem>
                  <MenuItem value="Kuwait">Kuwait</MenuItem>
                  <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                  <MenuItem value="Laos">Laos</MenuItem>
                  <MenuItem value="Latvia">Latvia</MenuItem>
                  <MenuItem value="Lebanon">Lebanon</MenuItem>
                  <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                  <MenuItem value="Lithuania">Lithuania</MenuItem>
                  <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                  <MenuItem value="Macau">Macau</MenuItem>
                  <MenuItem value="Macedonia">Macedonia</MenuItem>
                  <MenuItem value="Madagascar">Madagascar</MenuItem>
                  <MenuItem value="Malawi">Malawi</MenuItem>
                  <MenuItem value="Malaysia">Malaysia</MenuItem>
                  <MenuItem value="Maldives">Maldives</MenuItem>
                  <MenuItem value="Mali">Mali</MenuItem>
                  <MenuItem value="Malta">Malta</MenuItem>
                  <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                  <MenuItem value="Martinique">Martinique</MenuItem>
                  <MenuItem value="Mauritania">Mauritania</MenuItem>
                  <MenuItem value="Mauritius">Mauritius</MenuItem>
                  <MenuItem value="Mayotte">Mayotte</MenuItem>
                  <MenuItem value="Mexico">Mexico</MenuItem>
                  <MenuItem value="Micronesia">Micronesia</MenuItem>
                  <MenuItem value="Moldova">Moldova</MenuItem>
                  <MenuItem value="Monaco">Monaco</MenuItem>
                  <MenuItem value="Mongolia">Mongolia</MenuItem>
                  <MenuItem value="Montserrat">Montserrat</MenuItem>
                  <MenuItem value="Morocco">Morocco</MenuItem>
                  <MenuItem value="Mozambique">Mozambique</MenuItem>
                  <MenuItem value="Namibia">Namibia</MenuItem>
                  <MenuItem value="Nauru">Nauru</MenuItem>
                  <MenuItem value="Nepal">Nepal</MenuItem>
                  <MenuItem value="Netherlands">Netherlands</MenuItem>
                  <MenuItem value="Netherlands Antilles">Netherlands Antilles</MenuItem>
                  <MenuItem value="New Caledonia">New Caledonia</MenuItem>
                  <MenuItem value="New Zealand">New Zealand</MenuItem>
                  <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                  <MenuItem value="Niger">Niger</MenuItem>
                  <MenuItem value="Nigeria">Nigeria</MenuItem>
                  <MenuItem value="Niue">Niue</MenuItem>
                  <MenuItem value="Norway">Norway</MenuItem>
                  <MenuItem value="Oman">Oman</MenuItem>
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                  <MenuItem value="Palau">Palau</MenuItem>
                  <MenuItem value="Panama">Panama</MenuItem>
                  <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
                  <MenuItem value="Paraguay">Paraguay</MenuItem>
                  <MenuItem value="Peru">Peru</MenuItem>
                  <MenuItem value="Philippines">Philippines</MenuItem>
                  <MenuItem value="Poland">Poland</MenuItem>
                  <MenuItem value="Portugal">Portugal</MenuItem>
                  <MenuItem value="Puerto Rico">Puerto Rico</MenuItem>
                  <MenuItem value="Qatar">Qatar</MenuItem>
                  <MenuItem value="Romania">Romania</MenuItem>
                  <MenuItem value="Russian Federation">Russian Federation</MenuItem>
                  <MenuItem value="Rwanda">Rwanda</MenuItem>
                  <MenuItem value="Saint Helena">Saint Helena</MenuItem>
                  <MenuItem value="Saint Kitts-Nevis">Saint Kitts-Nevis</MenuItem>
                  <MenuItem value="Saint Lucia">Saint Lucia</MenuItem>
                  <MenuItem value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</MenuItem>
                  <MenuItem value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</MenuItem>
                  <MenuItem value="San Marino">San Marino</MenuItem>
                  <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                  <MenuItem value="Senegal">Senegal</MenuItem>
                  <MenuItem value="Serbia and Montenegro">Serbia and Montenegro</MenuItem>
                  <MenuItem value="Seychelles">Seychelles</MenuItem>
                  <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
                  <MenuItem value="Singapore">Singapore</MenuItem>
                  <MenuItem value="Slovakia">Slovakia</MenuItem>
                  <MenuItem value="Slovenia">Slovenia</MenuItem>
                  <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                  <MenuItem value="Somalia">Somalia</MenuItem>
                  <MenuItem value="South Africa">South Africa</MenuItem>
                  <MenuItem value="Spain">Spain</MenuItem>
                  <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                  <MenuItem value="Sudan">Sudan</MenuItem>
                  <MenuItem value="Suriname">Suriname</MenuItem>
                  <MenuItem value="Svalbard">Svalbard</MenuItem>
                  <MenuItem value="Swaziland">Swaziland</MenuItem>
                  <MenuItem value="Sweden">Sweden</MenuItem>
                  <MenuItem value="Switzerland">Switzerland</MenuItem>
                  <MenuItem value="Syria">Syria</MenuItem>
                  <MenuItem value="Tahiti">Tahiti</MenuItem>
                  <MenuItem value="Taiwan">Taiwan</MenuItem>
                  <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                  <MenuItem value="Tanzania">Tanzania</MenuItem>
                  <MenuItem value="Thailand">Thailand</MenuItem>
                  <MenuItem value="Togo">Togo</MenuItem>
                  <MenuItem value="Tonga">Tonga</MenuItem>
                  <MenuItem value="Trinidad and Tobago">Trinidad and Tobago</MenuItem>
                  <MenuItem value="Tunisia">Tunisia</MenuItem>
                  <MenuItem value="Turkey">Turkey</MenuItem>
                  <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                  <MenuItem value="Turks and Caicos Islands">Turks and Caicos Islands</MenuItem>
                  <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                  <MenuItem value="Uganda">Uganda</MenuItem>
                  <MenuItem value="Ukraine">Ukraine</MenuItem>
                  <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Uruguay">Uruguay</MenuItem>
                  <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                  <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                  <MenuItem value="Vatican City State">Vatican City State</MenuItem>
                  <MenuItem value="Venezuela">Venezuela</MenuItem>
                  <MenuItem value="Vietnam">Vietnam</MenuItem>
                  <MenuItem value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</MenuItem>
                  <MenuItem value="Wallis and Futuna">Wallis and Futuna</MenuItem>
                  <MenuItem value="Western Sahara">Western Sahara</MenuItem>
                  <MenuItem value="Western Samoa">Western Samoa</MenuItem>
                  <MenuItem value="Yemen">Yemen</MenuItem>
                  <MenuItem value="Zambia">Zambia</MenuItem>
                  <MenuItem value="Zimbabwe">Zimbabwe </MenuItem>
                </TextField>
                <br />
                <br />
                <TextField select margin="dense" name="sort" label="Sort By" variant="outlined" autoComplete="off" defaultValue="date" fullWidth>
                  <MenuItem value="date">Date Updated</MenuItem>
                  <MenuItem value="odate">Date Placed</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                </TextField>
                <TextField select margin="dense" name="sort_order" label="Sort Order" variant="outlined" autoComplete="off" defaultValue="DESC" fullWidth>
                  <MenuItem value="DESC">Descending</MenuItem>
                  <MenuItem value="ASC">Ascending</MenuItem>
                </TextField>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Input type="hidden" name="submitButton" value="Search" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button type="submit" form="search-form" onClick={handleSearch} color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  )
})
