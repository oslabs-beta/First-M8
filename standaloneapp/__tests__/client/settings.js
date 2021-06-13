import React from 'react';
import jest from 'jest';
import { MemoryRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import AddEditCard from '../../client/components/settings/AddEditCard';
import SettingsCard from '../../client/components/settings/SettingsCard';
import SettingsContainer from '../../client/components/settings/SettingsContainer';

configure({ adapter: new Adapter() });

// jest.mock('First-M8/standaloneapp');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    name: 'main 1',
  }),
  useRouteMatch: () => ({ url: '/settings' }),
}));


describe('React tests for settings components', () => {
  describe('SettingsCard', () => {
    let wrapper;
    const setting = {
      name: 'Test',
      ipAddress: 'local:host',
      port: 9090,
    };

    beforeAll(() => {
      wrapper = shallow(<SettingsCard setting={setting} />);
    });

    it('Renders a <div> tag with links to edit settings', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('Link').childAt(0).text()).toEqual('Name: Test');
      expect(wrapper.find('Link').childAt(1).text()).toEqual('IP Address: local:host');
      expect(wrapper.find('Link').childAt(2).text()).toEqual('Port: 9090');
    });
  });

  describe('SettingsContainer', () => {
    
    let wrapper;
    const settingsArr = [
      {
        name: 'Test',
        ipAddress: 'local:host',
        port: 9090,
      },
      {
        name: 'Test2',
        ipAddress: 'local:host',
        port: 3000,
      },
    ];
    beforeAll(() => {
      wrapper = shallow(<SettingsContainer settingsArr={settingsArr} match={{params: {id: 1}, isExact: true, path: "../../client/components/settings/", url: "/settings", location: "/settings"}}/>);
    });
    
    it('Renders a <div> tag containing a Switch component', () => {
      expect(wrapper.type()).toEqual('div');
      //expect(wrapper.childAt(0).type()).toEqual('Switch');
    })
    
    it('Should display all elements in settingsArr as SettingsCard component', () => {

    })
  });

  xdescribe('AddEditCard', () => {
    let wrapper;
    const settingsArr = [
      {
        name: 'Test',
        ipAddress: 'local:host',
        port: 9090,
      },
      {
        name: 'Test2',
        ipAddress: 'local:host',
        port: 3000,
      },
    ];

    beforeAll(() => {
      wrapper = mount(
        <MemoryRouter initialEntries={['/addEditCard']}>
          <AddEditCard settingsArr={settingsArr} />
        </MemoryRouter>
      );
    });

    it('Renders a <div> tag containing a Switch component', () => {
      expect(wrapper.type()).toEqual('div');
      //expect(wrapper.childAt(0).type()).toEqual('Switch');
    })

  })
});

