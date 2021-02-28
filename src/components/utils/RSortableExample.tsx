import React from 'react'
import RSortable from './RSortable'
import { Random } from 'mockjs'

const RandomBackground = () => ({ background: Random.color() })

export default () => (
  <RSortable group="depth-0">
    <ul>
      <li className="sortable p6" style={RandomBackground()}>
        <div className="flex-row">
          <div className="flex-col flex-col-40">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div className="flex-col flex-col-30">bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</div>
          <div className="flex-col flex-col-30">ccccccccccccccccccccccccccccccccccccc</div>
        </div>
        <div className="flex-row">
          <div className="flex-col flex-col-40">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          <div className="flex-col flex-col-30">bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</div>
          <div className="flex-col flex-col-30">ccccccccccccccccccccccccccccccccccccc</div>
        </div>
        <span>儲存庫1</span>
        <RSortable group="depth-1.1">
          <ul>
            <li className="sortable p6" style={RandomBackground()}>
              <span>模組1.1</span>
              <RSortable group="depth-1.2">
                <ul>
                  <li className="sortable p6" style={RandomBackground()}>介面1.1.1</li>
                  <li className="sortable p6" style={RandomBackground()}>介面1.1.2</li>
                  <li className="sortable p6" style={RandomBackground()}>介面1.1.3</li>
                </ul>
              </RSortable>
            </li>
            <li className="sortable p6" style={RandomBackground()}>模組1.2</li>
            <li className="sortable p6" style={RandomBackground()}>模組1.3</li>
          </ul>
        </RSortable>
      </li>
      <li className="sortable p6" style={RandomBackground()}>
        <span>儲存庫2</span>
        <RSortable group="depth-2.1">
          <ul>
            <li className="sortable p6" style={RandomBackground()}>
              <span>模組2.1</span>
              <RSortable group="depth-2.2">
                <ul>
                  <li className="sortable p6" style={RandomBackground()}>介面2.1.1</li>
                  <li className="sortable p6" style={RandomBackground()}>介面2.2.2</li>
                  <li className="sortable p6" style={RandomBackground()}>介面2.2.3</li>
                </ul>
              </RSortable>
            </li>
            <li className="sortable p6" style={RandomBackground()}>模組2.2</li>
            <li className="sortable p6" style={RandomBackground()}>模組2.3</li>
          </ul>
        </RSortable>
      </li>
      <li className="sortable p6" style={RandomBackground()}>團隊</li>
      <li className="sortable p6" style={RandomBackground()}>使用者</li>
    </ul>
  </RSortable>
)
