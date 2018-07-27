import React from "react";
/* Components */
import {AboutPage, EducationPage, ExperiencePage} from "../pages";
/* Icons */
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";

export const routes = [
  {
    link: "about",
    name: "About",
    icon: <PermIdentityIcon/>,
    component: AboutPage,
  },
  {
    link: "experience",
    name: "Experience",
    icon: <WorkIcon/>,
    component: ExperiencePage,
  },
  {
    link: "education",
    name: "Education",
    icon: <SchoolIcon/>,
    component: EducationPage,
  },
];