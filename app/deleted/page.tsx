"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";

function page() {
  const { deletedTasks } = useGlobalState();
  return <Tasks title="Deleted Tasks" tasks={deletedTasks} permaDelete={true} />;
}

export default page;
