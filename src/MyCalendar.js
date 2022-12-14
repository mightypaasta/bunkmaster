import React , { useEffect, useState } from 'react'
import CalendarHeader from './CalendarHeader/CalendarHeader';
import Day from './Day/Day'
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
    const weekdays=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

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
    
    const daysInMonth=new Date(year,month+1,0).getDate();

    // storing date in the format of "Thursday, 20 December 2012"
    const dateString=firstDayOfMonth.toLocaleDateString('en-us',{
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

    setDateDisplay(dt.toLocaleDateString('en-us',{month:'long'}));

    // padding days are used to indicate the days before the 1st day of the month
    // E.g Friday is the 1st day of Jan 2022 
    // Therefore, Monday,Tuesday,Wednesday,Thursday are called the padding days
    // No of paddingDays can be calculated by finding the index of the first day of the month in the weekdays array
    const paddingDays = weekdays.indexOf(dateString.split(',')[0]);

    // dayArr stores the day object in the array 
    const dayArr=[];

    for(let i=1;i<=paddingDays+daysInMonth;i++){
      const dayString = `${month+1}/${i-paddingDays}/${year}`;

      if(i>paddingDays){
        dayArr.push({
          value:i-paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i-paddingDays === day && nav === 0,
          date: dayString
        })
      }
      else{
        dayArr.push({
          value: 'padding',
          event:  null,
          isCurrentDay: false,
          date: ''
        })
      }
    }

    // Updating the days everytime a new event is added or user navigates to some other month/year
    setDays(dayArr);

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
        <div id='calendar'>
           {/* importing the Day component  */}
           {events.map((d,index)=>{
             <Day 
              day={d}
              key={index}
              onClick={()=>{
                if(days.value!=='padding'){
                  setClicked(days.date);
                }
              }}  
            />
           })}
        </div>
        <div id='mark-date'></div>
        <div id='unmark-date'></div>      
      </div>
    </div>
  );
}

export default MyCalendar;