"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const theme = themes[selectedTheme];

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme ? 0 : 1);
  }

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const allDeletedTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks/delete");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setDeletedTasks(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (task) => {
     try {
      const res = await axios.put(`/api/tasks/delete`, task);

      toast.success("Task deleted");

      allTasks();
      allDeletedTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const permaDeleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");

      allTasks();
      allDeletedTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const restoreDeletedTask = async (id) => {
    try {
      const res = await axios.get(`/api/tasks/delete/${id}`);
      toast.success("Task restored!");

      allTasks();
      allDeletedTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);

      toast.success("Task updated");

      allTasks();
      allDeletedTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  React.useEffect(() => {
    if (user) allTasks();
    if (user) allDeletedTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        selectedTheme,
        toggleTheme,
        tasks,
        deletedTasks,
        deleteTask,
        permaDeleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        allTasks,
        allDeletedTasks,
        restoreDeletedTask,
        collapsed,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
