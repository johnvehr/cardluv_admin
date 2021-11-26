import React from "react";
import { Outlet } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Main from "../components/Main";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/Content";
import Sidebar from "../components/sidebar/Sidebar";
import dashboardItems from "../components/sidebar/dashboardItems";

const Admin = ({ children }) => (
  <React.Fragment>
    <Wrapper>
    <Sidebar items={dashboardItems} />
      <Main>
        <Navbar />
        <Content>
          {children}
          <Outlet />
        </Content>
      </Main>
    </Wrapper>
  </React.Fragment>
);

export default Admin;
