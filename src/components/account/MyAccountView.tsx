import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'actions/types'
import { makeStyles, Theme, Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import EditMyAccountDialog from './EditMyAccountDialog'
import { logout, fetchLoginInfo } from 'actions/account'

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  root: {
    margin: spacing(2),
  },
  dialog: {
  },
  card: {
    minWidth: 375,
    maxWidth: 500,
    maxHeight: `calc(100% - ${spacing(4)}px)`,
    overflowY: 'auto',
  },
  media: {
    objectFit: 'cover',
    height: 250,
  },
  title: {
    marginTop: spacing(1),
    color: palette.primary.main,
  },
  dialogPapaer: {
    margin: spacing(2),
  },
}))

function MyAccountView() {
  const me = useSelector((state: RootState) => state.auth)
  const classes = useStyles()
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()
  const onEditSubmit = (isOk: boolean) => {
    setEditing(false)
    if (isOk) {
      dispatch(fetchLoginInfo())
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom={true} variant="h6" component="h6" className={classes.title}>
              {me.fullname}
            </Typography>
            <Typography component="p">
              這個傢伙很懶還沒有寫簽名.... 我們也不支援，這很糟耶
            </Typography>
            <Typography gutterBottom={true} variant="subtitle1" component="h6" className={classes.title} >
              昵稱
          </Typography>
            <Typography component="p">
              {me.fullname}
            </Typography>
            <Typography gutterBottom={true} variant="subtitle1" component="h6" className={classes.title} >
              帳號 / 信箱
          </Typography>
            <Typography component="p">
              {me.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => setEditing(true)}>修改資料</Button>
          <Button size="small" color="primary" onClick={() => dispatch(logout())}>退出登入</Button>
        </CardActions>
      </Card>
      {editing && <EditMyAccountDialog handleClose={onEditSubmit} />}
    </div>
  )
}

export default MyAccountView
