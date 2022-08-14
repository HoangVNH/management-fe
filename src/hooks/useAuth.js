import { setIsLoggedIn } from 'features/auth/authSlice';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();

  const checkAuthentication = useCallback(async () => {
    // const userInfo = await AuthenticationService.getUserInfo();

    // setIsLoggedIn(!!userInfo);
    dispatch(setIsLoggedIn);

    // Update auth in store
    // if (userInfo) {
    //   const userId = extractUserIdFromCognito(userInfo['cognito:username'])
    // }
  }, [dispatch]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return <></>;
};

export default useAuth;
