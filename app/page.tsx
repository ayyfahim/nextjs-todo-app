"use client";
import CalendarModal from "./Components/Modals/Calendar";
import Modal from "./Components/Modals/Modal";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  const { tasks, calendarModal } = useGlobalState();

  return <Tasks title="All Tasks" tasks={tasks} />;
}
