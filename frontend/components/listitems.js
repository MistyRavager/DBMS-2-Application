import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExploreIcon from '@mui/icons-material/Explore';
import CreateIcon from '@mui/icons-material/Create';
import LabelIcon from '@mui/icons-material/Label';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { WrapText } from '@mui/icons-material';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component="a" href="/create">
      <ListItemIcon>
        <CreateIcon />
      </ListItemIcon>
      <ListItemText primary="Create Question" />
    </ListItemButton>
    <ListItemButton component="a" href="/explore">
      <ListItemIcon>
        <ExploreIcon />
      </ListItemIcon>
      <ListItemText primary="Explore" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </React.Fragment>
);

export const topTags = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Top 5 Tags
    </ListSubheader>
    {/* <ListItemButton href='/'> */}
    <ListItemButton>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" primaryTypographyProps={{fontSize: '0.8em'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" primaryTypographyProps={{fontSize: '0.8em'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon >
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" primaryTypographyProps={{fontSize: '0.8em'}}/>
    </ListItemButton>
    <ListItemButton >
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" primaryTypographyProps={{fontSize: '0.8em'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LabelIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" primaryTypographyProps={{fontSize: '0.8em'}} />
    </ListItemButton>
  </React.Fragment>
);
export const topQuestions = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Top 5 Questions
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Current month Current month Current month " primaryTypographyProps={{fontSize: '0.8em',overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}/>
      
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter Last quarter Last quarter " primaryTypographyProps={{fontSize: '0.8em',overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale Year-end sale Year-end sale " primaryTypographyProps={{fontSize: '0.8em',overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale Year-end sale Year-end sale " primaryTypographyProps={{fontSize: '0.8em',overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <QuestionAnswerIcon/>
      </ListItemIcon>
      <ListItemText primary="Year-end sale Year-end sale Year-end sale" primaryTypographyProps={{fontSize: '0.8em',overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}/>
    </ListItemButton>
  </React.Fragment>
);
