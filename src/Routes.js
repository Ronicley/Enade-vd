/* eslint-disable linebreak-style */

import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Areas as AreasView,
  Courses as CoursesView,
  Regions as RegionsView,
  Typography as TypographyView,
  Icons as IconsView,
  Years as YearsView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/areas"
      />
      <RouteWithLayout
        component={AreasView}
        exact
        layout={MainLayout}
        path="/areas"
      />
      <RouteWithLayout
        component={CoursesView}
        exact
        layout={MainLayout}
        path="/cursos"
      />
      <RouteWithLayout
        component={RegionsView}
        exact
        layout={MainLayout}
        path="/regioes"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={YearsView}
        exact
        layout={MainLayout}
        path="/anos"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
