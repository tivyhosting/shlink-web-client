import { shallow } from 'enzyme';
import { values } from 'ramda';
import React from 'react';
import * as sinon from 'sinon';
import { HomeComponent } from '../../src/common/Home';

describe('<Home />', () => {
  let wrapped;
  const defaultProps = {
    resetSelectedServer() {
      return '';
    },
    servers: {},
  };
  const createComponent = (props) => {
    const actualProps = { ...defaultProps, ...props };

    wrapped = shallow(<HomeComponent {...actualProps} />);

    return wrapped;
  };

  afterEach(() => {
    if (wrapped !== undefined) {
      wrapped.unmount();
      wrapped = undefined;
    }
  });

  it('resets selected server when mounted', () => {
    const resetSelectedServer = sinon.spy();

    expect(resetSelectedServer.called).toEqual(false);
    createComponent({ resetSelectedServer });
    expect(resetSelectedServer.called).toEqual(true);
  });

  it('shows link to create server when no servers exist', () => {
    const wrapped = createComponent();

    expect(wrapped.find('Link')).toHaveLength(1);
    expect(wrapped.find('ListGroup')).toHaveLength(0);
  });

  it('shows servers list when list of servers is not empty', () => {
    const servers = {
      1: { name: 'foo', id: '123' },
      2: { name: 'bar', id: '456' },
    };
    const wrapped = createComponent({ servers });

    expect(wrapped.find('Link')).toHaveLength(0);
    expect(wrapped.find('ListGroup')).toHaveLength(1);
    expect(wrapped.find('ListGroupItem')).toHaveLength(values(servers).length);
  });
});
