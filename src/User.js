import React from 'react';
import { connect } from "react-redux";
import UserAction from "./actions/User";

class User extends React.Component {

  componentDidMount() {
    this.props.dispatch(UserAction());
  }

  render() {

    const {data} = this.props;

    return (
    <div>
      {data.userId}<br />
      {data.title}
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.userData
  };
};
export default connect(mapStateToProps)(User);
