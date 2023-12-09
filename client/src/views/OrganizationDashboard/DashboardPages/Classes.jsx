import React, { useEffect, useRef, useState } from 'react';
import { getOrgClasses, getClassrooms, updateClassroomMentors, createClassroom, deleteClassroom, getClassroom, getOrgMentors } from '../../../Utils/requests';
import {getCurrUser, useGlobalState} from '../../../Utils/userState';
import { getOrgUsers, getOrg} from "../../../Utils/requests";
import { message } from 'antd';
import '../../Dashboard/Dashboard.less';
import DashboardDisplayCodeModal from '../../Mentor/Dashboard/DashboardDisplayCodeModal';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../../components/NavBar/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import AddUserModal from "../../../components/AddUserModal/AddUserModal";    //reused modal form for adding users; could be replaced with a new form specific to mentors
//import { org } from '../Home';

export default function OrganizationClasses(props) {
    const [classrooms, setClassrooms] = useState([]);
    const orgUsers = getOrgUsers(props.id);
    const [user] = useGlobalState('currUser');
    const navigate = useNavigate();
    const newName = useRef();
    const newId = useRef();
    const [modalClassroom, setModalClassroom] = useState({});
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); 

    async function getClasses(id) {
        let org = await getOrg(id);
        let classes = org.data.classrooms;
        console.log("hi", classes);
        setClassrooms(classes);
        return classes;
    }

    const addMentor = async (classroom, name) => {
        let org = await getOrg(props.id);
        let new_mentor = org.data.mentors.find((m) => m.first_name === name);
        if (new_mentor === undefined) {
            message.error("Mentor not found");
            return false;
        } 
        else {
            if ("id" in classroom)
            {
                let mentors = (await getClassroom(classroom.id)).data.mentors;
                mentors.push(new_mentor);
                let res = await updateClassroomMentors(classroom.id, mentors);
                return true;
            }
            else {
                return false;
            }
        }
      }

    useEffect(() => {
        let classroomIds = [];
        let id = props.id;
        getClasses(id);
    }, []);

    useEffect(() => {
        console.log(classrooms);
    }, [classrooms]);
    
        const handleViewClassroom = (classroomId) => {
            navigate(`/classroom/${classroomId}`);
        };
        const deleteClass = (classroomId) => {
            deleteClassroom(classroomId);
        };
        function newClassroom() {
            const newClass = {
                id: newId.current.value,
                name: newName.current.value
            }
            createClassroom(newClass.id, newClass.name);
        }

        return (
        <div className='container nav-padding'>
            {/*<NavBar isMentor={true} />*/}
            <div id='main-header'>Welcome {user.name}</div>
            <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>
            <AddUserModal
                isOpen = {isAddUserModalOpen}
                submitUser = {(val) => addMentor(modalClassroom, val)}
                closeModal = {() => setIsAddUserModalOpen(false)}
            />
            <div id='classrooms-container'>
                <div id='dashboard-card-container'>
                    {classrooms.map((classroom) => (
                    <div key={classroom.id} id='dashboard-class-card'>
                        <div id='card-left-content-container'>
                            <h1 id='card-title'>{classroom.name}</h1>
                            <div id='card-button-container' className='flex flex-row'>
                                <button onClick={() => handleViewClassroom(classroom.id)}>
                                View
                                </button>
                                <button onClick={() => {setIsAddUserModalOpen(true); setModalClassroom(classroom);}}>Add Mentor</button>
                            </div>
                        </div>
                        <div id='card-right-content-container'>
                            <DashboardDisplayCodeModal code={classroom.code} />
                            <div id='divider' />
                            <div id='student-number-container'>
                                {/*<h1 id='number'>{classroom.students.length}</h1>*/}
                            <p id='label'>Students</p>
                        </div>
                    </div>
                </div>
          ))}
        </div>
      </div>
    </div>
           /* <div className='container nav-padding'>
                <NavBar isMentor={true} />
                <div id='main-header'>Hello {user.name}</div>
                <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>
                <div id='classrooms=container'>
                    <h1 id='card-title'> Add Class </h1>
                    <div id='card-button-container'>
                        <input ref={newName} type="text" placeholder="Name" />
                        <input ref={newId} type="text" placeholder="Id" />
                        <button onClick={newClassroom}>
                            Add
                        </button>
                    </div>
                </div>
                <div id='classrooms-container'>
                    <div id='dashboard-card-container'>
                        {classrooms.map((classroom) => (
                            <div key={classroom.id} id='dashboard-class-card'>
                                <div id='card-left-content-container'>
                                    <h1 id='card-title'>{classroom.name}</h1>
                                    <div id='card-button-container' className='flex flex-row'>
                                        <button onClick={() => handleViewClassroom(classroom.id)}>
                                            View
                                        </button>
                                        <button onClick={() => deleteClass(classroom.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div id='card-right-content-container'>
                                    <DashboardDisplayCodeModal code={classroom.code} />
                                    <div id='divider' />
                                    <div id='student-number-container'>
                                        <h1 id='number'>{classroom.students.length}</h1>
                                        <p id='label'>Students</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>*/
            
        );
    }