import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';

// LP
const About: React.FC = (props: any) => {
  return (
    <HomeLayout headerText="LP" prevRef='#' history={props.history}>
    </HomeLayout>
  );
}

export default About;