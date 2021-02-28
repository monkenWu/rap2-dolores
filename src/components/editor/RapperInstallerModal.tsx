import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import config from '../../config'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { SlideUp } from 'components/common/Transition'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import { Repository } from 'actions/types'
import { DialogContent } from '@material-ui/core'

type RapperType = 'normal' | 'redux'

const codeTmpl = ({ projectId, token, rapperType, rapperPath }: {
  projectId: number
  token?: string
  rapperType: RapperType
  rapperPath: string
}) => {
  const apiUrl = `${config.serve}/repository/get?id=${projectId}${token ? `&token=${token}` : ''}`
  const rapUrl = window.location.origin
  return String.raw`"rapper": "rapper --type ${rapperType} --rapperPath \"${rapperPath}\" --apiUrl \"${apiUrl}\" --rapUrl \"${rapUrl}\""`
}

const useReadmeStyles = makeStyles({
  root: {
    '&': {
      fontSize: 16,
    },
  },
  badge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

function Readme() {
  const classes = useReadmeStyles()

  return (
    <div className={classes.root}>
      <div style={{ textAlign: 'center' }}>
        <a href="https://github.com/thx/rapper" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.alicdn.com/tfs/TB1SlW9lQT2gK0jSZPcXXcKkpXa-1138-220.png"
            alt="Logo"
            width="250"
          />
        </a>
        <h3>一個自帶類型的請求庫（內測）</h3>
        <div className={classes.badge}>
          <iframe
            title="star"
            src="https://ghbtns.com/github-btn.html?user=thx&repo=rapper&type=star&count=true"
            scrolling="0"
            frameBorder="0"
            width="100px"
            height="20px"
          />
          <a
            href="https://www.yuque.com/rap/rapper/readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            文件
          </a>
        </div>
      </div>

      <h2>Rapper 是什麼？</h2>
      <p>Rapper 是 TypeScript 的最佳拍檔，它可以幫你建構具有類型定義的請求方案。</p>
      <ul>
        <li>無需自行書寫請求代碼，把 HTTP 介面當做函式呼叫</li>
        <li>請求參數/回應資料類型化，靜態校驗、自動完成快到飛起</li>
        <li>對 React/Redux 特別最佳化，提供全域資料方案，hooks 輕鬆使用</li>
      </ul>
      <p>
        更多瞭解請移步：
        <a href="https://www.yuque.com/rap/rapper/readme" target="_blank" rel="noopener noreferrer">
          文件
        </a>
      </p>
      <p>使用期間有疑問歡迎加入釘釘群：21912534</p>
      {/* <div style={{ textAlign: 'center' }}> */}
      <img
        src="https://img.alicdn.com/tfs/TB1mLzfnF67gK0jSZPfXXahhFXa-828-1068.png"
        alt="dingtalk"
        width="200"
      />
      {/* </div> */}
      <h2>快速設定</h2>
    </div>
  )
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: spacing(2),
      flex: 1,
    },
    btn: {
      marginBottom: spacing(2),
      marginTop: spacing(2),
    },
    content: {
      padding: '30px 15vw 40vh 15vw',
    },
    formControl: {
      margin: 0,
    },
    formItem: {
      marginBottom: 16,
    },
    formLabel: {
      fontSize: 16,
      marginBottom: 5,
    },
    step: {
      fontSize: 16,
      marginBottom: 10,
    },
    mode: {
      fontSize: 12,
      marginLeft: 10,
    },
  })
)

function RapperInstallerModal({
  open,
  handleClose,
  repository,
}: {
  open: boolean;
  handleClose: () => void;
  repository: Repository;
}) {
  const classes = useStyles()

  /** rapper 类型 normal redux */
  const [rapperType, setRapperType] = useState<RapperType>('normal')

  /** rapper 建構目录地址 */
  const [rapperPath, setRapperPath] = useState<string>('src/rapper')

  function handleRapperTypeChange(_event: React.ChangeEvent<HTMLInputElement>, value: RapperType) {
    setRapperType(value)
  }

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideUp}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            嘗試用 Rapper 幫你建構代碼
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.content}>
        <Readme />
        <div className={classes.formItem}>
          <FormLabel component="legend" className={classes.formLabel}>
            建構程式碼的模式
            <a href="https://www.yuque.com/rap/rapper/which-model" className={classes.mode} target="_blank" rel="noopener noreferrer">我該選擇哪種模式？</a>
          </FormLabel>
          <RadioGroup aria-label="rapperType" row={true} name="rapperType" value={rapperType} onChange={handleRapperTypeChange}>
            <FormControlLabel value="normal" control={<Radio />} label="基礎模式" />
            <FormControlLabel value="redux" control={<Radio />} label="React + Redux 進階模式" />
          </RadioGroup>
        </div>
        <div className={classes.formItem}>
          <FormLabel component="legend" className={classes.formLabel}>Rapper 建構檔案的目錄（相對於專案根目錄）</FormLabel>
          <TextField
            placeholder="src/rapper"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            value={rapperPath}
            onChange={(event) => setRapperPath(event.target.value)}
          />
        </div>
        <p className={classes.step}>1. 安裝 rapper 到項目依賴</p>
        <pre>npm install rap --save</pre>
        <p className={classes.step}>2. 替 package.json 的 scripts 物件下添加下面一行腳本</p>
        <pre>
          {codeTmpl({ projectId: repository.id, token: repository.token, rapperType, rapperPath })}
        </pre>
        <p className={classes.step}>3. 運作 rapper 建構程式碼</p>
        <pre>
          npm run rapper
        </pre>
        <p className={classes.step}>4. <a href="https://www.yuque.com/rap/rapper/use" target="_blank" rel="noopener noreferrer">愉快使用吧</a></p>

      </DialogContent>
    </Dialog>
  )
}

export default RapperInstallerModal
