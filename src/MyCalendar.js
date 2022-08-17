import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import React from 'react'
// import './calendar.css'

// const calEl = document.querySelector('#calendar');
// const cal=new VanillaCalendar('#calendar',{});
// cal.init()

const MyCalendar=() => {
  return (
    <div className='calendar'>
      <h1>Pick up the starting date</h1>
      <form>
        <label>
          Starting Date:
        </label>
        <input type="date" id="start-date"/>
        <label>
          Ending Date
        </label>
        <input type="date" id="end-date"/>
        <input type="submit" value="submit"/>
      </form>
    </div>
  );
}

export default MyCalendar;