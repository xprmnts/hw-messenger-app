import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './store/utils/thunkCreators';
import Auth from './components/Auth/Auth';

import { Home, SnackbarError } from './components';

const Routes = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === 'string') {
        setErrorMessage(user.error);
      } else {
        setErrorMessage('Internal Server Error. Please try again');
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  if (user.isFetchingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/register" component={Auth} />
        <Route
          exact
          path="/"
          render={(props) => (props.user?.id ? <Home /> : <Auth />)}
        />
        <Route path="/home" component={Home} />
      </Switch>
    </>
  );
};

export default withRouter(Routes);
