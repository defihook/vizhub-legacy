import React from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { NextAuth } from 'next-auth/client';

import Page from '../../components/page';
import { TitledPage } from '../../components/atoms/titledPage';
import { SignIn } from '../../components/molecules/signIn';
import { ActionBox } from '../../components/molecules/actionBox';
import { NavBar } from '../../components/organisms/navBar';

import { userFromSession } from '../../utils/userFromSession';

export default class extends Page {
  
  static async getInitialProps({req, res, query}) {
    const props = await super.getInitialProps({req});
    const session = await NextAuth.init({force: true, req: req});
    props.user = userFromSession(session);
    props.providers = await NextAuth.providers({req});
    
    // If signed in already, redirect to account management page.
    if (props.user.authenticated) {
      if (req) {
        res.redirect('/account');
      } else {
        Router.push('/account');
      }
    }

    // If passed a redirect parameter, save it as a cookie
    if (query.redirect) {
      const cookies = new Cookies((req && req.headers.cookie) ? req.headers.cookie : null);
      cookies.set('redirect_url', query.redirect, { path: '/' });
    }
    
    return props;
  }
  
  render() {
    return (
      <TitledPage title='Sign in'>
        <NavBar
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />
        <ActionBox title='Sign up or Sign in'>
          <SignIn
            user={this.props.user}
            providers={this.props.providers}
          />
        </ActionBox>
      </TitledPage>
    );
  }
}
