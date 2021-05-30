import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as api from '../../../Util/api';
import './NofiticationS.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const NotificationS = () => {
  const classes = useStyles();

  const [message, setMessage] = useState({
    list: []
  })

  const getNotification = async () => {
    const email = localStorage.getItem("email");
    setMessage({
      list: [{
        fullName: 'Plus',
        startTime: '2020/05/12/8:00AM',
        endTime: '2020/05/12/12:00AM'
      },{
        fullName: 'Plus',
        startTime: '2020/05/15/8:00AM',
        endTime: '2020/05/15/12:00AM'
      }
      ]
    })
    // const notifyRes = await api.getNotification(email);
    // try {
    //   if (notifyRes.status === 200) {
    //     setMessage({
    //       list: notifyRes.data,
    //     })
    //   }
    // } catch (error) {
    //   if (error.response.status === 404) {
    //     setMessage({
    //       list:[],
    //     })
    //   }
    // }
  }

  useEffect(() => {
    getNotification()
  }, [])

  const handleAccept = async (result, index) => {
    const fullName = result.fullName;
    const email = localStorage.getItem("email");
    const startTime = result.startTime;
    const endTime = result.endTime;
    const newAccept = [...list];
    newAccept.splice(index, 1)
    setMessage({
      list: newAccept,
    })
    // try {
    //   const acceptRes = await api.accept({ email, fullName, startTime, endTime });
    //   if (acceptRes.status === 200) {
    //     const newAccept = [...list];
    //     newAccept.splice(index, 1)
    //     setMessage({
    //       list: newAccept,
    //     })
    //   }
    // } catch (error) {
      
    // }
    
    
  }

  const handleRefuse = async (result, index) => {
    const fullName = result.fullName;
    const email = localStorage.getItem("email");
    const startTime = result.startTime;
    const endTime = result.endTime;
    const newRefuse = [...list];
    newRefuse.splice(index, 1)
    setMessage({
      list: newRefuse,
    })
    // try {
    //   const refuseRes = await api.refuse({ email, fullName, startTime, endTime });
    //   if (refuseRes.status === 200) {
    //     const newRefuse = [...list];
    //     newRefuse.splice(index, 1)
    //     setMessage({
    //       list: newRefuse,
    //     })
    //   }
    // } catch (error) {
      
    // }
  }
  
  const { list } = message;

  return (
    <div className="message-display">
      {list.map((result, index) => (
        <div>
          <p>Hi {result.fullName}, I plan to arrange your shift from {result.startTime} to {result.endTime}</p>
          <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={()=> handleAccept(result,index)}>Accept</Button>
            <Button  variant="contained" onClick={()=> handleRefuse(result,index)}>Refuse</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationS;
