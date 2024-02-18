import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifySuccess = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
  });
const notifyError = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
  });
const ToastMessage = () => {
  //   const notify = () => toast("message");
  //   notify();
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export { ToastMessage, notifySuccess, notifyError };
