import React from 'react'
import Markdown from 'markdown-to-jsx'
import { Paper, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(2),
    margin: spacing(2),
  },
}))

function AboutView() {
  const classes = useStyles()
  const md = `
  # 關於我們

  \`RAP2\`是在\`RAP1\`基礎上重做的新專案，它能給你提供方便的介面文檔管理、Mock、匯出等功能，包含兩個元件（對應兩個 Github Repository）。

  目前RAP2由\`阿里媽媽前端團隊\`開發，由多個合作團隊（包括開源社區）在維護。 詳請請見GitHub貢獻者清單。

  GitHub 儲存庫：

  rap2-delos: 後端伺服器儲存庫： [link](http://github.com/thx/rap2-delos)

  rap2-dolores: 前端 React 專案儲存庫： [link](http://github.com/thx/rap2-dolores)

  相關開源、部署建議，請關注 GitHub 儲存庫首頁 README

  同時歡迎您前往 [GitHub Issues](https://github.com/thx/rap2-delos/issues) 提出寶貴意見!

  釘釘群：11789704

  `
  return (
    <Paper className={classes.root}>
      <Markdown>{md}</Markdown>
    </Paper>
  )
}

export default AboutView
