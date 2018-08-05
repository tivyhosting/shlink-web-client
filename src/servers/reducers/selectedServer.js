import ShlinkApiClient from '../../api/ShlinkApiClient';
import ServersService from '../../servers/services/ServersService';
import { resetShortUrlParams } from '../../short-urls/reducers/shortUrlsListParams'

const SELECT_SERVER = 'shlink/selectedServer/SELECT_SERVER';
const RESET_SELECTED_SERVER = 'shlink/selectedServer/RESET_SELECTED_SERVER';

const defaultState = null;

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_SERVER:
      return action.selectedServer;
    case RESET_SELECTED_SERVER:
      return defaultState;
    default:
      return state;
  }
}

export const resetSelectedServer = () => ({ type: RESET_SELECTED_SERVER });

export const selectServer = serverId => dispatch => {
  dispatch(resetShortUrlParams());

  const selectedServer = ServersService.findServerById(serverId);
  ShlinkApiClient.setConfig(selectedServer);

  dispatch({
    type: SELECT_SERVER,
    selectedServer
  })
};