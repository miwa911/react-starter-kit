/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import fetch from '../../core/fetch';

export class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      message: 'nho nhe',
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        a: 1,
      }),
    }).then((response) => {
      console.log(JSON.stringify(response));
      return response.json()
    }).then(json => {
      //alert(json.data)
      this.setState({
        message: json.data,
      });
    })
  }
  async sendFormData() {
    const resp = await fetch('/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{news{title,link,contentSnippet}}',
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    this.setState({
      message: data,
    });
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>{this.state.message}</p>
          <form onSubmit={this.handleSubmit}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="usernameOrEmail">
                Username or email address:
              </label>
              <input
                className={s.input}
                id="usernameOrEmail"
                type="text"
                name="usernameOrEmail"
                autoFocus
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                className={s.input}
                id="password"
                type="password"
                name="password"
              />
            </div>
            <div className={s.formGroup}>
              <button className={s.button} type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export { Register as RegisterWithoutStyle };
export default withStyles(s)(Register);
