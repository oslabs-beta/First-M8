import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime';

import AddEditCard from '../../client/components/settings/AddEditCard';
import SettingsCard from '../../client/components/settings/SettingsCard';
import SettingsContainer from '../../client/components/settings/SettingsContainer';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    name: 'Test',
  }),
  useRouteMatch: () => ({
    path: '/settings',
    url: '/settings',
  }),
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
      wrapper = shallow(<SettingsContainer settingsArr={settingsArr} />);
    });

    it('Renders a <div> tag containing AddEditCard component and a <div> for the SettingsCard component', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('AddEditCard').prop('settingsArr')).toEqual(settingsArr);
      expect(wrapper.find('.settings-container').type()).toEqual('div');
    });

    it('Should display all elements in settingsArr as SettingsCard component', () => {
      expect(Array.isArray(settingsArr)).toEqual(true);
      expect(wrapper.find('SettingsCard').length).toEqual(settingsArr.length);
    });
  });

  describe('AddEditCard', () => {
    let wrapper;
    const settingsArr = [
      {
        name: 'Test',
        ipAddress: 'local:host',
        port: 9090,
      },
    ];

    beforeAll(() => {
      wrapper = shallow(<AddEditCard settingsArr={settingsArr} />);
    });

    it('Renders a <div> tag containing a form', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.childAt(0).type()).toEqual('form');
    });

    it('Should have input fields where the current values are equal to the name, ipAddress, and port in SettingsArr', () => {
      const inputFields = wrapper.find('input');
      const textToCheckFor = [settingsArr[0].name, settingsArr[0].ipAddress, settingsArr[0].port];
      inputFields.forEach((node, index) => {
        expect(node.prop('value')).toEqual(textToCheckFor[index]);
      });
    });

    it('Takes new input and replaces relevant information', () => {
      const eventObjName = { target: { id: 'name', value: 'newname' } };
      const eventObjIp = { target: { id: 'ipaddress', value: 'host:local' } };
      const eventObjPort = { target: { id: 'port', value: 3040 } };
      wrapper.find('#name').simulate('change', eventObjName);
      wrapper.find('#ipaddress').simulate('change', eventObjIp);
      wrapper.find('#port').simulate('change', eventObjPort);
      wrapper.update();

      expect(wrapper.find('#name').prop('value')).toEqual('newname');
      expect(wrapper.find('#ipaddress').prop('value')).toEqual('host:local');
      expect(wrapper.find('#port').prop('value')).toEqual(3040);
    });

    xit('Should call the onSubmit function when submit button is clicked', () => {
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.find('#settings-form').simulate('submit', mockEvent);
      expect(mockEvent.preventDefault).toBeCalledTimes(1);
    });

    xit('Should call the onClick function when delete button is clicked', () => {
      const button = wrapper.find('#delete');
      const mockDeleteFunction = jest.fn();
      button.simulate('click', mockDeleteFunction);
      expect(mockDeleteFunction).toHaveBeenCalled();
    });
  });
});
