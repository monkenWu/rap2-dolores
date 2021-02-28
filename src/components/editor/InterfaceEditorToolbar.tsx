import React, { useState } from 'react'
import { Button, makeStyles, Theme, createStyles, Tooltip } from '@material-ui/core'
import LoadingButton from '../common/LoadingButton'
import Create from '@material-ui/icons/Create'
import KeyboardTab from '@material-ui/icons/KeyboardTab'
import Save from '@material-ui/icons/Save'
import Cancel from '@material-ui/icons/Cancel'
import { useSelector } from 'react-redux'
import { RootState } from 'actions/types'
import History from '@material-ui/icons/History'
import HistoryLogDrawer from './HistoryLogDrawer'
import CloudDownload from '@material-ui/icons/CloudDownload'
import { ENTITY_TYPE } from 'utils/consts'
import { serve } from 'relatives/services/constant'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  })
)

interface Props {
  auth: any,
  repository: any,
  locker?: any,
  editable: boolean,
  itfId: number,
  moveInterface: any
  handleSaveInterfaceAndProperties: any
  handleUnlockInterface: any
  handleMoveInterface: any
  handleEditInterface: any
}

function InterfaceEditorToolbar(props: Props) {
  const {
    editable,
    locker,
    repository,
    handleEditInterface,
    handleMoveInterface,
    handleSaveInterfaceAndProperties,
    handleUnlockInterface,
    itfId,
  } = props

  const loading = useSelector((state: RootState) => state.loading)
  const [showHistory, setShowHistory] = useState(false)

  const classes = useStyles()
  if (!repository.canUserEdit) { return null }
  if (editable) {
    return (
      <div className="InterfaceEditorToolbar">
        <LoadingButton
          className={classes.button}
          onClick={handleSaveInterfaceAndProperties}
          variant="contained"
          color="primary"
          disabled={loading}
          label="儲存"
          size="small"
        >
          <Save className={classes.rightIcon} />
        </LoadingButton>
        <Button
          className={classes.button}
          onClick={handleUnlockInterface}
          variant="contained"
          size="small"
        >
          取消
          <Cancel className={classes.rightIcon} />
        </Button>
        <span className="locker-warning hide">已經鎖定當前介面！</span>
      </div>
    )
  }
  if (locker) {
    return (
      <div className="InterfaceEditorToolbar">
        <div className="alert alert-danger">當前介面已經被 <span className="nowrap">{locker.fullname}</span> 鎖定！</div>
      </div>
    )
  }
  return (
    <div className="InterfaceEditorToolbar">
       <Tooltip title="匯出的備份檔，可以導入到其它專案，或本專案">
        <Button
          className={`${classes.button} guide-2`}
          variant="contained"
          onClick={() => window.open(`${serve}/interface/backup/JSONData/${itfId}`)}
          size="small"
        >
          导出
        <CloudDownload className={classes.rightIcon} />
        </Button>
      </Tooltip>
      <Tooltip title="查看該介面中的所有改動歷史">
        <Button
          className={`${classes.button} guide-2`}
          variant="contained"
          onClick={() => setShowHistory(true)}
          size="small"
        >
          历史
        <History className={classes.rightIcon} />
        </Button>
      </Tooltip>
      <Tooltip title="移動或複製該介面">
        <Button
          className={classes.button}
          onClick={handleMoveInterface}
          variant="contained"
          size="small"
        >
          移動
        <KeyboardTab className={classes.rightIcon} />
        </Button>
      </Tooltip>
      <Tooltip title="點擊進入編輯模式，並鎖定該介面">
        <LoadingButton
          className={classes.button}
          onClick={handleEditInterface}
          variant="contained"
          color="primary"
          disabled={loading}
          label="編輯"
          size="small"
        >
          <Create className={classes.rightIcon} />
        </LoadingButton>
      </Tooltip>
      <HistoryLogDrawer
        open={showHistory}
        onClose={() => setShowHistory(false)}
        entityId={props.itfId}
        entityType={ENTITY_TYPE.INTERFACE}
      />
    </div>
  )
}

export default InterfaceEditorToolbar
