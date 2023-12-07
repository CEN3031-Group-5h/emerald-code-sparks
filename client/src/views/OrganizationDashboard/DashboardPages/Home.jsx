//we don't use this page. can remove it.

// export default function OrganizationHome() {
//   return (<p>Home Page for the organization</p>);
// }

import React, { useEffect, useState } from 'react';
import { getToken } from '../../../Utils/AuthRequests';
import { getOrgUsers, getOrg } from '../../../Utils/requests';
import { message } from 'antd';

export default function OrganizationHome(props) {
  const [org, setOrg] = useState({});
  const user = getToken();

  useEffect(() => {
    let classroomIds = [];
    getOrg(
      props.id
    ).then((res) => {
      if (res.data) {
        setOrg(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, []);

  if (!('Name' in org)) {
    return <div id="main-header">Welcome to Loading</div>;
  }
  return (
    <>
      <div id="main-header">Welcome to {org.Name}</div>
      <div className='home-desc'>To manage users within the organization, go to the users tab</div>
      <div className='home-desc'>To manage the classrooms within the organizataion, go to the classrooms tab</div>
    </>
  );
}
