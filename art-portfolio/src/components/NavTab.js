import React, { Component } from 'react'
import { Menu, Segment, Icon } from 'semantic-ui-react'
import { Link, } from 'react-router-dom';


export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
         <Menu pointing secondary>
         <Menu.Item as={ Link } name='Home' to='/profile'>
         <Icon name='user' />
          Home
          </Menu.Item>
          <Menu.Item
            as={ Link }
            name='log-in'
            to='/login'
            active={activeItem === 'log-in'}
            onClick={this.handleItemClick}
          />

           <Menu.Item
            as={Link} 
            to='/signup'
            name='sign-up'
            active={activeItem === 'sign-up'}
            onClick={this.handleItemClick}
          />
          
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              to='/profile'
              name='create-post'
              active={activeItem === 'create-post'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>

        <Segment>
          <img src='/images/wireframe/media-paragraph.png' alt='' />
        </Segment>
      </div>
    )
  }
}

