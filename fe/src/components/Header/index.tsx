import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [greeting, setGreeting] = useState("Hello");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Mengambil user dari session storage
    const storedUserData = sessionStorage.getItem("user");
    const userName = storedUserData
      ? JSON.parse(storedUserData).username
      : "Guest";

    // Menentukan greetings berdasarkan waktu
    const date = new Date();
    const hour = date.getUTCHours() + 7;
    let greetingText = "Hello";

    if (hour >= 4 && hour < 12) {
      greetingText = "Good morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good afternoon";
    } else if (hour >= 17 || hour < 4) {
      greetingText = "Good evening";
    }

    // Mengatur tanggal terkini
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    setCurrentDate(
      `${days[date.getUTCDay()]}, ${date.getUTCDate()} ${
        months[date.getUTCMonth()]
      } ${date.getUTCFullYear()}`
    );

    setGreeting(`${greetingText}, ${userName}`);
  }, []);

  return (
    <AntHeader
      style={{ background: "#1E1F21", padding: "0 50px", height: "100px" }}
    >
      <div>
        <Typography.Title
          level={5}
          style={{ color: "#DFDFDF", marginTop: "16px" }}
        >
          {currentDate}
        </Typography.Title>
        <Typography.Title level={3} style={{ color: "#DFDFDF", margin: 0 }}>
          {greeting}
        </Typography.Title>
      </div>
    </AntHeader>
  );
};

export default Header;
