import {UserSession, AppConfig} from 'blockstack';
import {decodeToken} from 'jsontokens';

const domain = window.location.origin;

export const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'], domain, '/auth', '/manifest.json')
});

export const decodeUserResponseToken = () => {
  const {authResponseToken} = userSession.loadUserData();
  return decodeToken(authResponseToken);
};

export const getUsername = () => {
  const {username} = decodeUserResponseToken().payload;
  return username || `ID-${userSession.loadUserData().identityAddress}`;
};