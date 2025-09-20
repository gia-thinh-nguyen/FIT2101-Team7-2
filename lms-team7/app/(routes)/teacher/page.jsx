"use client";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Dummy events
const events = [
  {
    title: "Daily Standup",
    start: new Date(2025, 0, 6, 10, 0), // Jan 6, 2025, 10:00 AM
    end: new Date(2025, 0, 6, 11, 0),
    allDay: false,
  },
  {
    title: "Sprint Review",
    start: new Date(2025, 0, 7, 13, 0),
    end: new Date(2025, 0, 7, 14, 0),
    allDay: false,
  },
  {
    title: "Sprint Retrospective",
    start: new Date(2025, 0, 7, 14, 0),
    end: new Date(2025, 0, 7, 15, 0),
    allDay: false,
  },
  {
    title: "Sprint Planning",
    start: new Date(2025, 0, 8, 13, 0),
    end: new Date(2025, 0, 8, 14, 0),
    allDay: false,
  },
  {
    title: "National Holiday",
    start: new Date(2025, 0, 11, 0, 0),
    end: new Date(2025, 0, 11, 23, 59),
    allDay: true,
  },
  {
    title: "Happy Friday!",
    start: new Date(2025, 0, 10, 10, 0),
    end: new Date(2025, 0, 10, 11, 0),
    allDay: false,
  },
];

export default function TeacherHomePage() {
  const courses = 3;
  const lessons = 18;
  const students = 42;

  return (
    <div className="min-h-screen bg-gray-50 transition-all duration-300"
         style={{ marginLeft: '4rem' }}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Welcome, Aadi Kapoor!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-semibold text-green-700">{courses}</span>
            <span className="mt-2 text-gray-600">Courses</span>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-semibold text-green-700">{lessons}</span>
            <span className="mt-2 text-gray-600">Lessons</span>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <span className="text-2xl font-semibold text-green-700">{students}</span>
            <span className="mt-2 text-gray-600">Students</span>
          </div>
        </div>
        {/* Weekly Calendar */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Weekly Calendar</h2>
          <Calendar
            localizer={localizer}
            events={events}
            defaultView="week"
            views={["week"]}
            style={{ height: 500, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}