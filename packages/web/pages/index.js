import React from 'react';
import { FullPage } from 'vizhub-ui';
import Page from '../components/page';
import { TitledPage } from '../components/atoms/titledPage';
import { NavBar } from '../components/organisms/navBar';

export default class extends Page {
  render() {
    return (
      <TitledPage title='VizHub.com'>
        <FullPage>
          <NavBar
            user={this.props.user}
            csrfToken={this.props.csrfToken}
          />
          <section className='hero is-medium is-dark is-bold is-fullheight'>
            <div className='hero-body'>
              <div className='container has-text-centered'>
                <h2 className='subtitle'>
                  A platform for teaching & learning
                </h2>
                <h1 className='title'>
                  Data Visualization
                </h1>
                <h2 className='subtitle'>
                  using D3.js and SVG.
                </h2>
                <a
                  className='button'
                  href='https://vizhub.com/curran/86a75dc8bdbe4965ba353a79d4bd44c8'
                >
                  Get Started
                </a>
                <div style={{ marginTop: '100px' }}>
                  <h2 className='subtitle'>
                    Watch these videos to start learning!
                  </h2>
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL9yYRbwpkykvOXrZumtZWbuaXWHvjD8gi" frameborder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </section>
        </FullPage>
      </TitledPage>
    );
  }
}
