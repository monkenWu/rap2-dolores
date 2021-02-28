import React from 'react'
import { serve } from '../../relatives/services/constant'
import './API.css'
import { Paper, Button } from '@material-ui/core'

const ExampleJQuery = () => (
  <div>
    <ul>
      <li>先導入jQuery外掛程式</li>
      <li>再導入基礎外掛程式</li>
      <li>最後導入RAP jQuery外掛程式</li>
    </ul>
    <h4>範例程式碼</h4>
    <pre className="code-example">
      {
        '<script src="jquery.min.js"></script>\n' +
        '<script src="http://rap2api.taobao.org/app/plugin/:projectId"></script>\n' +
        '<script src="http://rap2api.taobao.org/libs/jquery.rap.js"></script>\n' +
        '$.ajax({\n' +
        '    url : \'/example/1501049256513\', // 自動攔截\n' +
        '    method : \'GET\',\n' +
        '    dataType : \'JSON\',\n' +
        '    success : function(data) {\n' +
        '      // 返回根據 RAP 文件及規則產生的 mock 數據\n' +
        '      $(\'#result\').html(JSON.stringify(data))\n' +
        '    }\n' +
        '})\n'
      }
    </pre>
  </div>
)

// DONE 2.3 区分请求和响应作用域

type State = {
  showExampleJQuery: boolean;
}

type Props = any

class API extends React.Component<Props, State> {

  constructor(props: any) {
    super(props)
    this.state = {
      showExampleJQuery: false,
    }
  }
  render() {
    return (
      <Paper className="APIList">
        <div className="header">
          <span className="title">用戶文件</span>
        </div>
        <div className="body">
          <div className="API">
            <ul>
              <li>
                <a href="https://github.com/thx/rap2-delos/wiki">https://github.com/thx/rap2-delos/wiki</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header">
          <span className="title">平臺API介面</span>
        </div>
        <div className="body">
          <div className="API">
            <div className="title">取得儲存庫的完整資料（JSON）</div>
            <ul>
              <li><code>{serve}/repository/get?id=:repositoryId</code></li>
            </ul>
          </div>
          <div className="API">
            <div className="title">取得介面的完整資料（JSON）</div>
            <ul>
              <li><code>{serve}/interface/get?id=:interfaceId</code></li>
            </ul>
          </div>
          <div className="API">
            <div className="title">取得儲存庫前端外掛程式（JS）</div>
            <ul>
              <li><span className="label">基礎外掛程式</span><code>{serve}/app/plugin/:repositories</code></li>
              <li><span className="label">jQuery 外掛程式</span><code>{serve}/libs/jquery.rap.js</code>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={
                    e => {
                      e.preventDefault()
                      this.setState((prevState) => {
                        return { showExampleJQuery: !prevState.showExampleJQuery }
                      })
                    }
                  }
                >
                  用法
                </Button>
              </li>
              {this.state.showExampleJQuery && <ExampleJQuery />}
              <li><span className="label">Mock.js 外掛程式</span><code>{serve}/libs/mock.rap.js</code></li>
              <li><span className="label">fetch 外掛程式</span><code>{serve}/libs/fetch.rap.js</code></li>
            </ul>
          </div>
          <div className="API">
            <div className="title">取得單一介面的資料（JSON）</div>
            <ul>
              <li>
                <code>{serve}/app/mock/data/:interfaceId?scope=response|request</code>
                <table className="table table-bordered mt12">
                  <thead>
                    <tr>
                      <th style={{ width: '140px' }}><code>scope</code></th>
                      <th>描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>response</code></td>
                      <td>取得單一介面的回應資料（JSON）</td>
                    </tr>
                    <tr>
                      <td><code>request</code></td>
                      <td>取得單一介面的請求資料（JSON）</td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li><code>{serve}/app/mock/:repositoryId/:method/:url</code></li>
            </ul>
          </div>
          <div className="API">
            <div className="title">取得單一介面的模板（JSON）</div>
            <ul>
              <li>
                <code>{serve}/app/mock/template/:interfaceId?scope=response|request</code>
                <table className="table table-bordered mt12">
                  <thead>
                    <tr>
                      <th style={{ width: '120px' }}><code>scope</code></th>
                      <th>描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>response</code></td>
                      <td>取得單一介面的回應模板（JSON）</td>
                    </tr>
                    <tr>
                      <td><code>request</code></td>
                      <td>取得單一介面的請求模板（JSON）</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
          <div className="API">
            <div className="title">取得單一介面的模板（JSON Schema）</div>
            <ul>
              <li>
                <code>{serve}/app/mock/schema/:interfaceId?scope=response|request</code>
                <table className="table table-bordered mt12">
                  <thead>
                    <tr>
                      <th style={{ width: '120px' }}><code>scope</code></th>
                      <th>描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>response</code></td>
                      <td>取得單一介面的回應模板（JSON Schema）</td>
                    </tr>
                    <tr>
                      <td><code>request</code></td>
                      <td>取得單一介面的請求模板（JSON Schema）</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
      </Paper>
    )
  }
}

export default API
