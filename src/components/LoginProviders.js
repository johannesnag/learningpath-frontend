import React from 'react';
import { apiResourceUrl, locationOrigin } from '../sources/helpers';

const query = '?successUrl=' + locationOrigin + '/login/success/{appkey}' +
              '&failureUrl=' + locationOrigin + '/login/failure';

export default function LoginProviders() {
  return (
    <div className='one-column one-column--narrow'>
      <h3>Logg inn i NDLA med</h3>
      <ul className='vertical-menu'>
        <li className='vertical-menu_item'><a className='cta-link cta-link--block cta-link--gl' href={apiResourceUrl('/auth/login/google' + query)}>Google</a></li>
        <li className='vertical-menu_item'><a className='cta-link cta-link--block cta-link--fb' href={apiResourceUrl('/auth/login/facebook' + query)}>Facebook</a></li>
        <li className='vertical-menu_item'><a className='cta-link cta-link--block cta-link--tw' href={apiResourceUrl('/auth/login/twitter' + query)}>Twitter</a></li>
      </ul>
    </div>
  );
}
