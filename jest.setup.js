import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

process.env.REACT_APP_AIRBRAKE_ID = '123';
process.env.REACT_APP_AIRBRAKE_KEY = 'airbrakesecretkey';
