import React from 'react'
import { NavLink } from 'react-router-dom'
import { GoHome, GoRepo, GoOrganization, GoPulse, GoPlug } from 'react-icons/go'

export default () => (
  <ul className="nav-links">
    <li><NavLink exact={true} to="/" activeClassName="selected"><GoHome /> 首頁</NavLink></li>
    <li><NavLink to="/repository" activeClassName="selected"><GoRepo /> 儲存庫</NavLink></li>
    <li><NavLink to="/organization" activeClassName="selected"><GoOrganization /> 團隊</NavLink></li>
    <li><NavLink to="/api" activeClassName="selected"><GoPlug /> 介面</NavLink></li>
    <li><NavLink to="/status" activeClassName="selected"><GoPulse /> 狀態</NavLink></li>
  </ul>
)
