import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import {
  Button,
  Theme,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { SlideUp } from 'components/common/Transition'
import { ImportSwagger } from '../../actions/types'
import RepositoryService from '../../relatives/services/Repository'
import './ImportSwaggerRepositoryForm.css'
import { importSwaggerRepository } from '../../actions/repository'

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {},
  form: {
    minWidth: 500,
    minHeight: 160,
  },
  alert: {
    minWidth: 500,
    minHeight: 7,
  },
  formItem: {
    marginBottom: spacing(1),
  },
  ctl: {
    marginTop: spacing(3),
  },
  section: {
    display: 'inline',
  },
}))

const schema = Yup.object().shape<Partial<ImportSwagger>>({
  docUrl: Yup.string(),
  swagger: Yup.string(),
})

const FORM_STATE_INIT: ImportSwagger = {
  version: 1,
  docUrl: '',
  orgId: 0,
  mode: 'manual',
  swagger: '',
  repositoryId: 0,
}

interface Props {
  open: boolean
  onClose: (isOk?: boolean) => void
  orgId?: number
  repositoryId?: number
  mode: string
  modId?: number
}

export enum IMPORT_TYPE {
  /** 从Swagger 2.0 URL 或 JSON 文件导入 */
  SWAGGER_2_0 = 1,
  /** 从RAP2改动时系统生成的备份JSON文件导入 */
  RAP2_ITF_BACKUP = 2,
}

function ImportSwaggerRepositoryForm(props: Props) {
  const { open, onClose, orgId, mode, repositoryId, modId } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const [alertOpen, setAlertOpen] = useState({ op: false, msg: '' })

  return (
    <section className={classes.section}>
      <Dialog
        open={open}
        onClose={(_event, reason) => reason !== 'backdropClick' && onClose()}
        TransitionComponent={SlideUp}
      >
        <DialogTitle>導入儲存庫</DialogTitle>
        <DialogContent dividers={true}>
          <div className={classes.form}>
            <Formik
              initialValues={{
                ...FORM_STATE_INIT,
              }}
              validationSchema={schema}
              onSubmit={async (values, actions) => {
                let swagger = values.swagger
                if (!swagger) {
                  try {
                    swagger = await RepositoryService.getSwaggerRepository({
                      docUrl: values.docUrl,
                    })
                  } catch (error) {
                    setAlertOpen({
                      op: true,
                      msg:
                        '無法取得 Swagger 資料，請檢查您的 Swagger 服務是否允許 CORS，或者使用直接貼上 JSON 匯入',
                    })
                    actions.setSubmitting(false)
                    return
                  }
                } else {
                  try {
                    swagger = JSON.parse(swagger)
                  } catch (error) {
                    setAlertOpen({
                      op: true,
                      msg: '解析失敗，不是有效的JSON，請檢查 JSON 格式',
                    })
                    actions.setSubmitting(false)
                    return
                  }
                }
                const importSwagger: ImportSwagger = {
                  ...values,
                  mode,
                  swagger,
                  orgId,
                  repositoryId,
                  modId,
                }

                const submitPromise = new Promise(resolve => {
                  dispatch(
                    importSwaggerRepository(importSwagger, (res: any) => {
                      if (res.isOk === 'success') {
                        setAlertOpen({ op: true, msg: '匯入成功' })
                        window.location.reload()
                      } else {
                        setAlertOpen({ op: true, msg: `匯入失敗，請檢查檔案格式，詳細錯誤：${res.message}.` })
                     }
                      onClose(true)
                      resolve(null)
                    }),
                  )
                })

                await submitPromise

              }}
              render={({ isSubmitting, setFieldValue, values }) => {
                return (
                  <Form>
                    <div className="rmodal-body">
                      <div className={classes.formItem}>
                        <RadioGroup
                          name="radioListOp"
                          value={values.version}
                          onChange={e => {
                            setFieldValue('version', +e.target.value)
                          }}
                          row={true}
                        >
                          <FormControlLabel disabled={isSubmitting} value={IMPORT_TYPE.SWAGGER_2_0} control={<Radio />} label="Swagger 2.0" />
                          <FormControlLabel disabled={isSubmitting} value={IMPORT_TYPE.RAP2_ITF_BACKUP} control={<Radio />} label="RAP2介面備份JSON" />
                        </RadioGroup>
                      </div>
                      {values.version === IMPORT_TYPE.SWAGGER_2_0 &&
                        <div className={classes.formItem}>
                          <Field
                            placeholder=""
                            name="docUrl"
                            label="從 Swagger URL 取得"
                            component={TextField}
                            fullWidth={true}
                            variant="outlined"
                            disabled={isSubmitting}
                          />
                        </div>
                      }
                      <div className={classes.formItem}>
                        <Field
                          placeholder=""
                          name="swagger"
                          label={values.version === IMPORT_TYPE.SWAGGER_2_0 ? '或是直接貼上 Swagger JSON' : '貼上 RAP2 介面備份 JSON'}
                          component={TextField}
                          fullWidth={true}
                          multiline={true}
                          rows="4"
                          variant="outlined"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className={classes.ctl}>
                      <Button
                        type="submit"
                        variant="contained"
                        color={isSubmitting ? 'inherit' : 'primary'}
                        className="mr1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? '導入中，由於批量導入資料量較大請耐心稍等...' : '提交'}
                      </Button>
                      {!isSubmitting && (
                        <Button onClick={() => onClose()} disabled={isSubmitting}>
                          取消
                        </Button>
                      )}
                    </div>
                  </Form>
                )
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={alertOpen.op}
        onClose={() => setAlertOpen({ op: false, msg: '' })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">提示</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className={classes.alert}>
            {alertOpen.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen({ op: false, msg: '' })} color="primary">
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}

export default ImportSwaggerRepositoryForm
