import React, { useState, MouseEventHandler, CSSProperties } from 'react'
import { connect, Link, StoreStateRouterLocationURI, replace } from '../../family'
import { sortInterfaceList, deleteInterface, unlockInterface } from '../../actions/interface'
import { deleteModule } from '../../actions/module'
import { Module, Repository, RootState, Interface, User } from '../../actions/types'
import { RSortable, CustomScroll } from '../utils'
import InterfaceForm from './InterfaceForm'
import { useConfirm } from 'hooks/useConfirm'
import { GoPencil, GoTrashcan, GoLock } from 'react-icons/go'
import { getCurrentInterface } from '../../selectors/interface'
import { Button, ButtonGroup, makeStyles, Theme } from '@material-ui/core/'
import ModuleForm from './ModuleForm'
import MoveModuleForm from './MoveModuleForm'
import { useSelector, useDispatch } from 'react-redux'
import './InterfaceList.css'

interface InterfaceBaseProps {
  repository: Repository
  mod: Module
  active?: boolean
  auth?: User
  itf?: Interface
  curItf?: Interface
  deleteInterface: typeof deleteInterface
  replace?: typeof replace
  unlockInterface: typeof unlockInterface
}

function InterfaceBase(props: InterfaceBaseProps) {
  const { repository, mod, itf, curItf, unlockInterface } = props
  const auth = useSelector((state: RootState) => state.auth)
  const router = useSelector((state: RootState) => state.router)
  const selectHref = StoreStateRouterLocationURI(router)
    .setSearch('itf', itf!.id.toString())
    .href()
  const [open, setOpen] = useState(false)

  const handleDeleteInterface: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault()
    const message = `介面被刪除后不可回復！\n確認繼續刪除「#${itf!.id} ${itf!.name}」嗎？`
    if (window.confirm(message)) {
      const { deleteInterface } = props
      deleteInterface(props.itf!.id, () => {
      })
      const { pathname, hash, search } = router.location
      replace(pathname + hash + search)
    }
  }

  return (
    <div className="Interface clearfix">
      <span>
        <Link
          to={selectHref}
          onClick={e => {
            if (
              curItf &&
              curItf.locker
            ) {
              if (!window.confirm('編輯模式下切換介面，會導致編輯中的資料丟失，是否確定切換介面？')) {
                e.preventDefault()
              } else {
                unlockInterface(curItf.id)
              }
            } else {
              const top = document.querySelector<HTMLElement>('.InterfaceEditor')!.offsetTop - 10
              // 当接口列表悬浮时切换接口自动跳转到接口顶部
              if (window.scrollY > top) {
                window.scrollTo(0, top)
              }
            }
          }}
        >
          <div className="name">{itf!.name}</div>
          <div className="url">{itf!.url}</div>
        </Link>
      </span>
      {repository.canUserEdit ? (
        <div className="toolbar">
          {itf!.locker ? (
            <span className="locked mr5">
              <GoLock />
            </span>
          ) : null}
          {!itf!.locker || itf!.locker.id === auth.id ? (
            <span className="fake-link" onClick={() => setOpen(true)}>
              <GoPencil />
            </span>
          ) : null}
          <InterfaceForm
            title="修改接口"
            repository={repository}
            mod={mod}
            itf={itf}
            open={open}
            onClose={() => setOpen(false)}
          />
          {!itf!.locker ? (
            <Link to="" onClick={handleDeleteInterface}>
              <GoTrashcan />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
const mapStateToProps = (state: RootState) => ({
  curItf: getCurrentInterface(state),
  router: state.router,
})
const mapDispatchToProps = {
  replace,
  deleteInterface,
  unlockInterface,
}
const InterfaceWrap = connect(mapStateToProps, mapDispatchToProps)(InterfaceBase)

interface InterfaceListProps {
  itfs?: Interface[]
  itf?: any
  curItf: Interface
  mod: Module
  repository: Repository
}
const useStyles = makeStyles(({ palette }: Theme) => ({
  interface: {
    border: `1px solid ${palette.primary.main}`,
  },
  interfaceActive: {
    borderLeft: `3px solid ${palette.primary.main}`,
  },
  li: {
    borderBottom: `1px solid ${palette.primary.main}`,
  },
}))
function InterfaceList(props: InterfaceListProps) {
  const [interfaceFormOpen, setInterfaceFormOpen] = useState(false)
  const [moduleFormOpen, setModuleFormOpen] = useState(false)
  const [moveModuleFormOpen, setMoveModuleFormOpen] = useState(false)
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const auth = useSelector((state: RootState) => state.auth)
  const { repository, itf, itfs = [], mod } = props
  const classes = useStyles()

  const dangerousStyles: CSSProperties = { color: '#CC0000', fontWeight: 'bold', fontSize: 16, display: 'inline', margin: '0 4px' } // 给眼神不太好的同学专门的设计

  const handleDeleteModule: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    const message = (
      <div style={{ width: 800 }}>
        <div><div style={dangerousStyles}>模組</div>被刪除後<div style={dangerousStyles}>不可回復</div>！ 並且會刪除<div style={dangerousStyles}>相關的介面</div>！</div>
        <div>
          確認繼續刪除「#${mod.id} ${mod.name}
          」嗎？
        </div>
      </div>
    )
    confirm({
      title: '確認刪除模組',
      content: message,
    }).then(() => {
      dispatch(
        deleteModule(
          props.mod.id,
          () => {
          },
          repository!.id,
        ),
      )
    })
  }

  const handleSort = (_: any, sortable: any) => {
    dispatch(
      sortInterfaceList(sortable.toArray(), mod.id, () => {
        /** empty */
      }),
    )
  }

  if (repository.modules.length === 0) {
    return <div style={{ height: 600 }}>請先添加模組</div>
  }


  return (
    <article className="InterfaceList">
      {repository.canUserEdit ? (
        <div className="header">
          <Button
            className="newIntf"
            variant="outlined"
            fullWidth={true}
            color="primary"
            onClick={() => setInterfaceFormOpen(true)}
          >
            新建介面
          </Button>

          <InterfaceForm
            title="新建介面"
            repository={repository}
            mod={mod}
            open={interfaceFormOpen}
            onClose={() => setInterfaceFormOpen(false)}
          />

          <ButtonGroup fullWidth={true} size="medium">
            <Button variant="outlined" color="primary" onClick={() => setModuleFormOpen(true)}>
              修改模組
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setMoveModuleFormOpen(true)}>
              移動/複製
            </Button>
            <Button variant="outlined" color="primary" onClick={handleDeleteModule}>
              刪除模組
            </Button>
          </ButtonGroup>

          {moduleFormOpen && (
            <ModuleForm
              title="修改模組"
              module={mod}
              repository={repository}
              open={moduleFormOpen}
              onClose={() => setModuleFormOpen(false)}
            />
          )}

          {moveModuleFormOpen && (
            <MoveModuleForm
              title="移動/複製模組"
              mod={mod}
              repository={repository}
              open={moveModuleFormOpen}
              onClose={() => setMoveModuleFormOpen(false)}
            />
          )}
        </div>
      ) : null}
      {itfs.length ? (
        <div className={`scrollWrapper ${classes.interface}`}>
          <CustomScroll>
            <RSortable onChange={handleSort} disabled={!repository.canUserEdit}>
              <ul className="body">
                {itfs.map((item: any) => (
                  <li
                    key={item.id}
                    className={`${item.id === itf!.id ? classes.interfaceActive : ''} sortable ${classes.li}`}
                    data-id={item.id}
                  >
                    <InterfaceWrap
                      repository={repository}
                      mod={mod}
                      itf={item}
                      active={item.id === itf!.id}
                      auth={auth}
                    />
                  </li>
                ))}
              </ul>
            </RSortable>
          </CustomScroll>
        </div>
      ) : (
          <div className="alert alert-info">暫無介面，請新建</div>
        )}
    </article>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceList)
