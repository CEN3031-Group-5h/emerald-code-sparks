import { createGlobalState } from 'react-hooks-global-state';

// Get the role of user from the session storage
export const getCurrUser = () => {
  const result = JSON.parse(sessionStorage.getItem('user'));
  console.log(result);
  if (!result) {
    return {
      role: 'DefaultUser',
    };
  }
  if (!result.role) {
    return {
      role: 'Student',
    };
  } else if (result.role.type === 'content_creator') {
    return {
      role: 'ContentCreator',
      name: result.role.name,
    };
  } else if (result.role.type === 'researcher') {
    return {
      role: 'Researcher',
      name: result.role.name,
    };
  } else if (result.role.type === 'authenticated') {
    return {
      role: 'Mentor',
      name: result.role.name,
    };
  }
  //added admin role
  //(name returns username instead of role)
  else if (result.role.type === 'admin') {
    return {
      role: 'Admin',
      name: result.username,
      id: result.id,
      email: result.email,
    };
  }

};

const { setGlobalState, useGlobalState } = createGlobalState({
  currUser: getCurrUser(),
});

export const setUserState = (s) => {
  setGlobalState('currUser', s);
};

export { useGlobalState };
