import { message } from 'antd';
import React, { useState, useEffect} from 'react';
import { Tabs } from 'antd';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import { useGlobalState } from '../../Utils/userState';
import { getOrg} from '../../Utils/requests';
import NonOrgMember from './OrganizationNonMember';
import './OrganizationDashboard.less';
//import OrganizationDashSideBar from './OrgDashboardSidebar'; //not used
//import OrganizationHome from './DashboardPages/Home'; //not used
import OrganizationUsers from './DashboardPages/Users';
//import OrganizationModeration from './DashboardPages/Moderation/Moderation'; //not used
import OrganizationClasses from './DashboardPages/Classes';
import OrganizationLessons from './DashboardPages/Lessons';
import {useSearchParams, useParams, useNavigate} from 'react-router-dom';

//separating the tabs for later use in rendering
const { TabPane } = Tabs;
export default function OrganizationDashboard() {

  //state and hookis initiallization
  const [value] = useGlobalState('currUser'); 
  const [verify, setVerify] = useState(false);
  const { orgId } = useParams();
  const navigate = useNavigate();

  //checks if the current user is an admin or member of the current org
  async function isVerified(orgId) {
    let org = await getOrg(orgId);
    return (value.role === 'Admin') && (org.data.users.map((user) => user.id).includes(value.id));
  }

  useEffect(() => {
    isVerified(orgId).then(verified => {
      setVerify(verified);
    });
  }, [orgId]);  // Add orgId to the dependency array

  // function to handle navigation to previous page
  const handleBack = () => {
    navigate(-1);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  //renders page content based on which tab is selected
  function Page(props) {
    return (
    <div className="container nav-padding">
    <NavBar />
      <button id='org-back-btn' onClick={handleBack}>
        <i className='fa fa-arrow-left' aria-hidden='true' />
      </button>
    <Tabs
      defaultActiveKey={tab ? tab : 'home'}
      onChange={(key) => setSearchParams({ tab: key })}
    >
      <TabPane tab="Classrooms" key="classroom">
        <OrganizationClasses id={props.id}/>
      </TabPane>
     
      <TabPane tab="Users" key="users">
        <OrganizationUsers id={props.id}/>
      </TabPane>
      {/*<TabPane tab="Moderation" key="moderation">
        <OrganizationModeration id={props.id}/>
      </TabPane>
       <TabPane tab="Home" key="home">
        <OrganizationHome id={props.id}/>
      </TabPane>
      */
      }
      
    
      <TabPane tab="Lessons" key="lessons">
        <OrganizationLessons/>
      </TabPane>
      </Tabs>
  </div>)
  }

  const renderedPage = <Page id={orgId}/>;

  if (!verify) return <NonOrgMember/> //if user is not verified, render nonorg component
  else return renderedPage; //continue with rendering page component
}
