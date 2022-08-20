import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import React , { useEffect, useState } from 'react'
import CalendarHeader from './CalendarHeader/CalendarHeader';
import './calendar.css'

// const calEl = document.querySelector('#calendar');
// const cal=new VanillaCalendar('#calendar',{});
// cal.init()


const MyCalendar=() => {
  const [nav,setNav]=useState(0);
  const [days,setDays]=useState('');
  const [dateDisplay,setDateDisplay]=useState('');
  const [click,setClicked]=useState(null);
  const [events,setEvents]=useState(localStorage.getItem('setEvent')?JSON.parse(localStorage.getItem('setEvent')):[]);
  const [monthDisplay,setMonthDisplay]=useState([]);

  const eventForDate=date=>events.find(e=>e.date===date);

  useEffect(()=>{
    localStorage.setItem('events',JSON.stringify(events));
  },[events]);

  useEffect(()=>{
    const dt=new Date();
    const weekdays=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    // Changing the value of the month depending upon the value of the nav
    if(nav!==0){
      dt.setMonth(new Date().getMonth() + nav);
    }

    // extracting date,month and year 
    const day=dt.getDate();
    const month=dt.getMonth();
    const year=dt.getFullYear();

    // saving firstDayOfTheMonth by passing 1 as the value of day param
    // Since months are stored in 0-based indexing format 
    
    const firstDayOfMonth=new Date(year,month,1);

    // Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
    // but by using 0 as the day it will give us the last day of the prior
    // month. So passing in 1 as the month number will return the last day
    // of January, not February
    
    const dayInMonth=new Date(year,month+1,0).getDate();

    // storing date in the format of "Thursday, 20 December 2012"
    const dateString=firstDayOfMonth.toLocaleDateString('en-us',{
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

    setDateDisplay(dt.toLocaleDateString('en-us',{month:'long'}));

    // padding days are used to 
    const paddingDays = weekdays.indexOf(dateString.split(',')[0]);
  },[nav,events])
  
  return (
    <div className='calendar'>
      <div id='container'>
        <CalendarHeader/>
        <div id='weekdays'>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
          <div>Sunday</div>
        </div>
        {/* <div id='calendar'>
           {events.map((d,index)=>{
             <Day 
              day={d}
              key={index}
              onClick={()=>{
                if(day.value!=='padding'){
                  setClicked(day.date);
                }
              }}  
            />
           })}
        </div> */}
        <div id='mark-date'></div>
        <div id='unmark-date'></div>      
      </div>
    </div>
  );
}

export default MyCalendar;