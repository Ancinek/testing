import { asyncComponent } from 'react-async-component';
import './styles.scss';

export default asyncComponent({
  resolve: () => System.import(/* webpackChunkName: "counter" */ './CounterRoute'),
});
