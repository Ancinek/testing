import { combineReducers } from 'redux';
import client from '../../config/components/apolloConfig';

export default combineReducers({
  app: (state = {}) => state,
  apollo: client.reducer(),
});
