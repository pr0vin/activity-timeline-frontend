import React from "react";

function StatusView({ status }) {
  const dotStyle = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "block",
    margin: "5px",
  };

  const dotColors = {
    done: "#4CAF50",
    canceled: "#FF5722",
    notDone: "#2196F3",
    postponed: "#FFEB3B",
  };
  const statusNepali = {
    done: "भएको",
    notDone: "नभएको",
    postponed: " हुने तर नभएको",
    canceled: "रद्द गरिएको",
  };
  return (
    <>
      <div className="inline-flex gap-3 items-center px-10">
        <span
          className=" "
          style={{ ...dotStyle, backgroundColor: dotColors[status] }}
        ></span>
        <span className="capitalize">{statusNepali[status]}</span>
      </div>
    </>
  );
}

export default StatusView;
