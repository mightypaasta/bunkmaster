import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import React , { useState } from 'react'
// import './calendar.css'

// const calEl = document.querySelector('#calendar');
// const cal=new VanillaCalendar('#calendar',{});
// cal.init()


const MyCalendar=() => {
  const [nav,setNav]=useState(0);
  const [click,setClick]=useState(null);
  const [events,setEvents]=useState(localStorage.getItem('setEvent')?JSON.parse(localStorage.getItem('setEvent')):[]);
  const [monthDisplay,setMonthDisplay]=useState([]);

  const eventForDate=date=>events.find(e=>e.date===date);
  return (
    <div className='calendar'>
      <div id='container'>
        <div id='calendar-header'></div>
        <div id='weekdays'>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
          <div>Sunday</div>
        </div>
        <div id='calendar'></div>
        <div id='mark-date'></div>
        <div id='unmark-date'></div>      
      </div>
    </div>
  );
}

export default MyCalendar;