import React from 'react'
import config from '../../config'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import { SlideUp } from 'components/common/Transition'

export default function ExportPostmanForm(props: {
  repoId: number;
  open: boolean;
  onClose: () => void;
  title: string;
}) {
  const { repoId, open, onClose, title } = props
  const postmanLink = `${config.serve}/export/postman?id=${repoId}`
  const markdownLink = `${config.serve}/export/markdown?id=${repoId}&origin=${window.location.origin}`
  const docxLink = `${config.serve}/export/docx?id=${repoId}&origin=${window.location.origin}`
  const rapLink =`${config.serve}/repository/get?id=${repoId}`

  // const pdfLink = `${config.serve}/export/pdf?id=${repoId}&origin=${window.location.origin}`
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      TransitionComponent={SlideUp}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={true}>
        <form className="form-horizontal" onSubmit={() => false}>
          <div className="mb5">
            <div>
              Postman:</div>
            <div
              className="alert alert-info"
              role="alert"
              style={{ margin: '8px 0' }}
            >
              <a href={postmanLink} target="_blank" rel="noopener noreferrer">
                {postmanLink}
              </a>
            </div>
            <div>點擊以上連結下載，在 Postman 中點擊匯入（Import），選擇從文件導入（Import File）下載的檔案。</div>
          </div>

          <div>
            <div>Markdown:</div>
            <div
              className="alert alert-info"
              role="alert"
              style={{ margin: '8px 0' }}
            >
              <a href={markdownLink} target="_blank" rel="noopener noreferrer">
                {markdownLink}
              </a>
            </div>
          </div>

          <div>
            <div>Docx:</div>
            <div
              className="alert alert-info"
              role="alert"
              style={{ margin: '8px 0' }}
            >
              <a href={docxLink} target="_blank" rel="noopener noreferrer">{docxLink}</a>
            </div>
          </div>

          <div>
            <div>RAP Data:</div>
            <div
              className="alert alert-info"
              role="alert"
              style={{ margin: '8px 0' }}
            >
              <a href={rapLink} target="_blank" rel="noopener noreferrer">{rapLink}</a>
            </div>
            <div>用於備份，或在其它RAP2平台匯入，打開後另存新檔即可。 也可通過程式設計存取。</div>
          </div>

          <div className="mt10">
            <Button variant="outlined" onClick={onClose}>
              關閉
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
